"""This script extract the pixel matrix from a png image.

Provide data for our DCNN project
"""

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import os
import json

import numpy as np
from PIL import Image
from PIL import ImageStat


BASE_DIR = './static/cifar-10/'
TARGET_DIR = BASE_DIR + 'test-imgs/'
DEST_DIR = BASE_DIR + 'test-imgs-data/'
DEST_IMG_SIZE = (24, 24)

def get_files_from_dir(path):
    """Get files.
    """
    f_list = []
    files = os.listdir(path)
    for a_file in files:
        if os.path.splitext(a_file)[-1] == '.png':
            f_list.append(path + a_file)
    return f_list


def extract_flat_pixels_from(file_path):
    """Extract the Image Pixels.
    @return
        1D tensor ([channel * height * width])
        image height
        image width
    """
    img = Image.open(file_path).convert('RGB')
    img = img.resize(DEST_IMG_SIZE)
    print(list(img.getdata()))
    return list(img.getdata())


def export_to_json_file(tensor, file_path):
    """Export a tensor to a json file.
    """
    with open(file_path, 'w') as f:
        f.write(json.dumps(tensor))


if __name__ == '__main__':
    img_flat_tensor = []  # [batch_size * height * width * channel]
    for an_img in get_files_from_dir(TARGET_DIR):
        new_tensor = extract_flat_pixels_from(an_img)
        img_flat_tensor += new_tensor
    np_img_flat_tensor = np.array(img_flat_tensor).ravel().tolist()
    # print(len(np_img_flat_tensor))
    export_to_json_file(np_img_flat_tensor, DEST_DIR + 'data.json')
