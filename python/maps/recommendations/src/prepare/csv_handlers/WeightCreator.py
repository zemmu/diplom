import os
from pathlib import Path

import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class WeightCreator:
    def __init__(self):
        self.main_dataframe: pd.DataFrame = None
        self.path_to_data_dir = os.path.join(Path(__file__).resolve().parent.parent.parent, "data")
        self.vectorizer = CountVectorizer()

    def read_csv(self, filename):
        full_path = os.path.join(self.path_to_data_dir, filename)
        return pd.read_csv(full_path, encoding='utf-8', sep=',', on_bad_lines='skip')

    def start(self):
        self.main_dataframe = self.read_csv("main.csv")
        self.create_weights()

    def create_weights(self):
        self.main_dataframe["data"] = self.main_dataframe["Описание"].fillna('')

        vectorized = self.vectorizer.fit_transform(self.main_dataframe["data"])
        similarities = cosine_similarity(vectorized)
        df_final = pd.DataFrame(
            similarities,
            columns=self.main_dataframe['Название'],
            index=[
                self.main_dataframe['ID в ИС ГТИБД'], self.main_dataframe['Название'],
                self.main_dataframe["Вид объекта"], self.main_dataframe["Адрес"],
                self.main_dataframe["Режим работы"], self.main_dataframe["Координаты"],
                self.main_dataframe["Описание ориг"]
            ]
        )

        df_final.to_csv(os.path.join(self.path_to_data_dir, "weights.csv"))
        print(df_final)


wc = WeightCreator()

if __name__ == '__main__':
    wc.start()
