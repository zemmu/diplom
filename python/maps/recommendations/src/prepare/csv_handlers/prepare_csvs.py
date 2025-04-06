import multiprocessing

from recommendations.src.prepare.csv_handlers import main, make_main_csv, WeightCreator

csv_files = ["dostoprimechatelnosti.csv", "vzaly.csv"]


def full_prepare():
    print("[start full prepare]")
    main.handle_files(csv_files)
    print("[files ready to work]")
    make_main_csv.MakeMain(csv_files).make_main_csv()
    print("[main csv created]")
    WeightCreator.WeightCreator().start()
    print("[weights created]")


if __name__ == '__main__':
    multiprocessing.freeze_support()
    full_prepare()
