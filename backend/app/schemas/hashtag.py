from pydantic import BaseModel
from typing import List


class HashtagRequest(BaseModel):
    nama_pria: str
    nama_wanita: str


class HashtagResponse(BaseModel):
    hashtags: List[str]