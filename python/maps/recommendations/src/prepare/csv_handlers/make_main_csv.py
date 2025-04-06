import multiprocessing
import os
import time
from pathlib import Path

import pandas as pd

from .TextProcessing import tp


class MakeMain:
    def __init__(self, csv_files):
        self.csv_files = csv_files
        self.res = None
        self.processed_dir = os.path.join(Path(__file__).resolve().parent.parent.parent, *["data", "processed"])
        self.lock = multiprocessing.Lock()
        self.full_path_main = os.path.join(Path(self.processed_dir).parent, "main.csv")

    def process_and_save_dataframe(self, csv_file, lock):
        print(csv_file)
        description_title = "Описание"
        full_path_to_file = os.path.join(self.processed_dir, csv_file)
        csv_data = pd.read_csv(full_path_to_file, encoding='utf-8', sep=',', on_bad_lines='skip')

        if description_title in csv_data.columns:
            csv_data[description_title] = csv_data[description_title].apply(tp.stop_words_processing)

        with lock:
            if not os.path.exists(self.full_path_main):
                csv_data.to_csv(self.full_path_main, index=False)
            else:
                csv_dest_data = pd.read_csv(self.full_path_main, encoding='utf-8', sep=',', on_bad_lines='skip')
                res = pd.concat([csv_dest_data, csv_data])
                res.to_csv(self.full_path_main, index=False)
            print(csv_file)

    def make_main_csv(self):
        start = time.time()
        procs = []

        if os.path.exists(self.full_path_main):
            os.remove(self.full_path_main)

        for csv_file in self.csv_files:
            proc = multiprocessing.Process(target=self.process_and_save_dataframe, args=(csv_file, self.lock))
            procs.append(proc)
            proc.start()

        for p in procs:
            p.join()

        print("[Done in:", time.time() - start, "; files:", self.csv_files, "]")



# if __name__ == '__main__':
#     multiprocessing.freeze_support()
#     MakeMain().make_main_csv()



