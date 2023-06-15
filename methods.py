import json
import os


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
                    if course not in acceptables:
                        remove_keys.append(course)

                for key in remove_keys:
                    del allotment[key]

        return main_data

    elif criteria == 'colleges':
        for year in main_data:
            for allotment in main_data[year]:
                remove_courses = []
                for course in allotment:
                    filtered_data = filter(lambda row: row[0] in acceptables, allotment[course])
                    allotment[course] = [*filtered_data]

                    if len(allotment[course]) == 0:
                        remove_courses.append(course)

                for course in remove_courses:
                    del allotment[course]

        return main_data


def write_data(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f)


main_data = load_all_data('./compiled_data')
filtered_data = filter_by(main_data, criteria='colleges', acceptables=['RGB', 'MUT', 'TVE', 'TKM'])

write_data('./test_returns/data.json', filtered_data)
