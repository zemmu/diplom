import os
from pathlib import Path
import re
from typing import List

import pandas as pd

# Символы для удаления
pattern_chars = r'[!@"“’«»#$%&\'()*+,№.\n—/:;<=>?^_`{|}~\[\]]'

# Путь к директории с необработанными файлами. Путь относительно этого файла
dir_with_raw_files = os.path.join(Path(__file__).resolve().parent.parent.parent, *["data", "raw"])
# Путь к директории с обработанными файлами. Путь относительно этого файла
dir_with_processed_files = os.path.join(Path(__file__).resolve().parent.parent.parent, *["data", "processed"])


columns_to_keep = [
    "ID в ИС ГТИБД", "Вид объекта", "Название", "Тип учреждения",
    "Описание", "Историческая справка", "Заметки", "Адрес", "Адрес (ручной)",
    "Геопозиция", "Координаты", "Режим работы"
]

def process_text(text):
    try:
        if len(text):
            lower_text = str(text).lower()
            without_chars = re.sub(pattern_chars, " ", lower_text).lstrip().rstrip()
            without_extra_blanks = re.sub(r' {2,}', " ", without_chars)
            return without_extra_blanks
    except:
        pass

    return text


class CsvHandler:
    def __init__(self, filename: str, column_key_to_filter: str = None, column_values_to_filter: List[str] = None,
                 columns_to_keep: List[str] = None, new_filename: str = None):
        self.filename = filename
        self.column_key_to_filter = column_key_to_filter
        self.column_values_to_filter = column_values_to_filter
        self.columns_to_keep = columns_to_keep
        self.new_filename = new_filename or filename
        self.csv_data = pd.DataFrame()

    def read_csv(self, is_processed=False):
        dir_to_files = dir_with_processed_files if is_processed else dir_with_raw_files
        path_to_data = os.path.join(dir_to_files, self.filename)
        if os.path.exists(path_to_data):
            self.csv_data = pd.read_csv(path_to_data, encoding='utf-8', sep=',', on_bad_lines='skip')
            return self.csv_data
        else:
            print(f"Такого файла не существует! Путь к файлу: {path_to_data}")
            return None

    def save_csv_file(self):
        dest_full_path = os.path.join(dir_with_processed_files, self.new_filename)
        if os.path.exists(dest_full_path):
            os.remove(dest_full_path)
        self.csv_data.to_csv(dest_full_path, index=False)

    def drop_columns(self):
        all_columns = self.csv_data.columns
        self.csv_data.drop(
            columns=[col for col in all_columns if col not in self.columns_to_keep],
            inplace=True,
            axis=1
        )

    def copy_description(self):
        self.csv_data["Описание ориг"] = self.csv_data["Описание"]

    def process_columns(self):
        for column in self.csv_data.columns:
            if column not in ["Адрес", "Адрес (ручной)", "Геопозиция", "Координаты", "Описание ориг", "Режим работы"]:
                processed_text = self.csv_data[column].apply(process_text)
                self.csv_data[column] = processed_text

                self.csv_data[column] = self.csv_data[column].fillna("")
            else:
                if column == "Адрес (ручной)":
                    self.csv_data = self.csv_data.rename(columns={column: "Адрес"})
                if column == "Геопозиция":
                    self.csv_data = self.csv_data.rename(columns={column: "Координаты"})
    def remove_duplicates(self):
        print(
            self.csv_data[self.csv_data.duplicated(['Название'])]
        )
        self.csv_data = self.csv_data.drop_duplicates(['Название'])

    def full_process(self):
        self.read_csv()
        self.drop_columns()
        self.copy_description()
        self.remove_duplicates()
        self.process_columns()
        self.save_csv_file()


# files = ["dostoprimechatelnosti.csv", "vzaly.csv"]


def handle_files(files):
    for file in files:
        handler = CsvHandler(file, columns_to_keep=columns_to_keep)
        handler.full_process()


# if __name__ == '__main__':
#     handle_files()
    # csv_handler = CsvHandler(files[0], columns_to_keep=columns_to_keep)
    # csv_handler.read_csv()
    # csv_handler.drop_columns()
    # csv_handler.remove_duplicates()
    # csv_handler.full_process()
