from pymystem3 import Mystem
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem.snowball import SnowballStemmer
import re

pattern_chars = '[!@"“’«»#$%&\'()*+,.\n—/:;<=>?^_`{|}~\[\]]'


class TextProcessing:
    def __init__(self):
        self.mystem = Mystem()
        self.stemmer = SnowballStemmer("russian")
        self.stop_words = set(stopwords.words('russian'))

    def lemmatize(self, text, return_string=False):
        text_array = self.mystem.lemmatize(text)
        if return_string:
            return "".join(text_array).replace("\n", "")

        return text_array

    def nltk_download_modules(self):
        nltk.download('popular')
        nltk.download('punkt')
        nltk.download('stopwords')

    def stop_words_processing(self, text):
        # При первом запуске раскоментировать
        # self.nltk_download_modules()
        try:
            if len(text):
                text = str(text)
            else:
                return text
        except:
            return text

        word_tokens = word_tokenize(text)
        without_stop_words = [word for word in word_tokens if word not in self.stop_words]
        without_stop_words_text = " ".join(without_stop_words)
        without_chars = re.sub(pattern_chars, "", without_stop_words_text)
        stemmed_words = self.lemmatize(without_chars, return_string=True)

        return stemmed_words


tp = TextProcessing()
