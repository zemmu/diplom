from typing import TypedDict, NotRequired


class RegType(TypedDict):
    id: NotRequired[int]
    username: str
    email: str
    password: str

