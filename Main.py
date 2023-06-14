from docx import Document
from docx.text.paragraph import Paragraph
from docx.table import Table
from docx.oxml.text.paragraph import CT_P
from docx.oxml.table import CT_Tbl
import json
import os


def get_para_data(para_obj):
    para = para_obj.text.strip()
    if para != '':

        i1 = para.find('[')
        if i1 != -1:
            para = para[0:i1].strip()

        return para
    else:
        return None


def get_table_data(table_obj):
    table_data = []
    for row_obj in table_obj.rows[1:]:
        row_data = []
        for cell in row_obj.cells[:4]:
            row_data.append(cell.text)

        table_data.append(row_data)

    return table_data


def compile_docx(word_file, save_pathname):

    doc = Document(word_file)

    rank_list = {}
    prev_title = ''
    for element in doc.element.body:
        if isinstance(element, CT_P):
            para_obj = Paragraph(element, doc.element.body)

            title = get_para_data(para_obj)

            if title:
                rank_list.setdefault(title, [])
                prev_title = title

        elif isinstance(element, CT_Tbl):
            table_obj = Table(element, doc.element.body)
            table_data = get_table_data(table_obj)
            rank_list[prev_title].extend(table_data)

    for course in list(rank_list.keys()):
        if len(rank_list[course]) == 0:
            del rank_list[course]
            continue

        rank_list[course] = sorted(rank_list[course], key=lambda row: int(row[-1]) if row[-1].isdigit() else 1000000)

    with open(save_pathname, 'w') as f:
        json.dump(rank_list, f)


def display(data):
    with open('./prio_list3.txt', 'w', encoding='utf-8') as f:
        for course in data:
            f.write(course)

            for i, row in enumerate(data[course], 1):

                row.insert(0, f'{i})')

                row_str = '\n\n\t' + '  ■■  '.join(row)
                f.write(row_str)

            f.write('\n\n' + '=='*50 + '\n\n')


def select_data(data_path, courses='all', row_per_course=10):
    # courses parameter takes a list as an alternative to 'all'

    with open(data_path, 'r') as f:
        data = json.load(f)

    if courses == 'all':
        req_courses = list(data.keys())
    else:
        req_courses = courses

    ordered_ranklist = {}
    for course in req_courses:
        req_data = data[course][0:row_per_course]
        ordered_ranklist[course] = req_data

    display(ordered_ranklist)


def test_uniformity(path):
    # Expects three files in path

    files = os.listdir(path)

    key_len = []
    for file in files:
        with open(f"{path}/{file}", 'r') as f:
            data = json.load(f)

        keys_set = set(data.keys())
        key_len.append(keys_set)

    key_len = sorted(key_len, key=lambda item: len(item), reverse=True)

    diff = key_len[0] - key_len[1]
    diff2 = key_len[1] - key_len[2]
    diff3 = key_len[0] - key_len[2]

    all_diff = [*diff, *diff2, *diff3]
    all_diff = list(set(all_diff))

    if len(all_diff) == 0:
        return True
    else:
        print(all_diff)
        raise RuntimeError


word_file = './rank_details/2022/1.docx'
savename = './compiled_data/2022/1.json'


# compile_docx(word_file, savename)

test_uniformity('./compiled_data/2020')

select_data(savename, ['Computer Science & Engineering'], 30)
