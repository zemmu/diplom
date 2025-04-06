import os

import matplotlib.pyplot as plt

from recommendations.src.prepare.csv_handlers.WeightCreator import RecommendationSystem

path_to_data_dir = os.path.abspath("./data/")
full_path = os.path.join(path_to_data_dir, "temp.csv")

weight = {
    "сады и парки": 0.3,
    "залы": 0.6,
    "религиозные объекты": 0.1
}
objects = list(weight.keys())

place = 'музей современного искусства  эрарта '
rc = RecommendationSystem(place, weight)
data = rc.start()

colors = ["#1f77b4", "#17becf", "#ff7f0e"]
plt.figure(figsize=(32, 5))
plt.ylabel('Название')
plt.xlabel('Значение')
plt.title('Косинусное сходство')


for _, row in data.iterrows():
    title = str(row["Название"])
    # print(
    #     "[ Название :", row["Название"], " ]    [ Значение :", row[place], " ]"
    # )
    try:
        color_index = objects.index(row["Вид объекта"])
    except:
        color_index = 1

    max_len = 40

    if len(title) > max_len:
        title = title[:max_len] + "..."
    else:
        title = title[:max_len]

    plt.barh(title, row[place], color=colors[color_index])

plt.show()

# for key in res:
#     print("[weight]", key, weight[key])
#     print(
#         "[result]", res[key],
#          "\n"
#     )


