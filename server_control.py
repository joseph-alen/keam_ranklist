import json
import os
import http.server
import socketserver
from urllib.parse import urlparse
from urllib.parse import parse_qs


def load_all_data(data_dir):
    year_dirs = os.listdir(data_dir)

    main_data = {}
    for year_dir in year_dirs:

        files = os.listdir(f'{data_dir}/{year_dir}')

        allotments_data = []
        for filename in files:
            with open(f'{data_dir}/{year_dir}/{filename}', 'r') as f:
                data = json.load(f)

            allotments_data.append(data)

        main_data[year_dir] = allotments_data

    return main_data


def order_by(main_data, criteria='rank'):

    if criteria == 'rank':
        return main_data

    elif criteria == 'type':
        print('Sorting by type')
        for year in main_data:
            for allotment in main_data[year]:
                for course in allotment:
                    sorted_course = sorted(allotment[course], key=lambda row: row[2])
                    allotment[course] = sorted_course

        return main_data


def filter_by(main_data, criteria='courses', acceptables=[]):

    if criteria == 'courses':
        for year in main_data:
            for allotment in main_data[year]:
                remove_keys = []
                for course in allotment:
                    if course.lower() not in acceptables:
                        remove_keys.append(course)

                for key in remove_keys:
                    del allotment[key]

        return main_data

    elif criteria == 'colleges':
        for year in main_data:
            for allotment in main_data[year]:
                remove_courses = []
                for course in allotment:
                    filtered_data = filter(lambda row: row[1].lower() in acceptables, allotment[course])
                    allotment[course] = [*filtered_data]

                    if len(allotment[course]) == 0:
                        remove_courses.append(course)

                for course in remove_courses:
                    del allotment[course]

        return main_data

    elif criteria == 'type':
        print('Filtering by type')
        print(acceptables)
        for year in main_data:
            for allotment in main_data[year]:
                remove_courses = []
                for course in allotment:
                    filtered_data = filter(lambda row: row[2] in acceptables, allotment[course])
                    allotment[course] = [*filtered_data]

                    if len(allotment[course]) == 0:
                        remove_courses.append(course)

                for course in remove_courses:
                    del allotment[course]

        return main_data

    elif criteria == 'year':
        remove_years = []
        for year in main_data:
            if year not in acceptables:
                remove_years.append(year)

        for year in remove_years:
            del main_data[year]

        return main_data


def write_data(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f)


class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):

        # if self.path == '/':
        #     self.path = '/website/index.html'
        #     return http.server.SimpleHTTPRequestHandler.do_GET(self)

        if urlparse(self.path).path == '/data_endpoint':

            self.send_response(200)

            self.send_header("Content-type", "application/json")

            self.end_headers()

            main_data = load_all_data('./compiled_data')

            query_params = parse_qs(urlparse(self.path).query)
            # input(query_params)

            filter_criteria = query_params['filter_option'][0].lower()
            sort_critera = query_params['sort_option'][0].lower()
            acceptables = query_params['acceptables'][0].lower()

            if 'none' not in filter_criteria:
                if acceptables == 'none':
                    new_acceptables = []
                else:
                    acceptables = acceptables.split('~')

                    new_acceptables = []
                    for acceptable in acceptables:

                        if '&amp;' in acceptable:
                            acceptable = acceptable.replace('&amp;', '&')

                        if filter_criteria == 'type':
                            if 'government' in acceptable:
                                new_acceptables.append('G')
                            elif 'semi' in acceptable:
                                new_acceptables.append('N')
                            elif 'private' in acceptable:
                                new_acceptables.append('S')

                        elif filter_criteria == 'year':
                            new_acceptables.append(acceptable)

                        elif filter_criteria == 'courses':
                            new_acceptables.append(acceptable)
                            print(new_acceptables)

                        elif filter_criteria == 'colleges':
                            new_acceptables.append(acceptable)

                main_data = filter_by(main_data, criteria=filter_criteria, acceptables=new_acceptables)

            new_data = order_by(main_data, criteria=sort_critera)

            write_data('./test_returns/data.json', new_data)

            json_str = json.dumps(new_data)
            bytes_data = json_str.encode('utf-8')

            self.wfile.write(bytes_data)

            return

        else:
            return http.server.SimpleHTTPRequestHandler.do_GET(self)


main_data = load_all_data('./compiled_data')


handler_object = MyHttpRequestHandler

PORT = 8000
my_server = socketserver.TCPServer(("", PORT), handler_object)

# Star the server
my_server.serve_forever()
