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


def extract_flat_pixels_and_shape_from(file_path):
    """Extract the Image Pixels.

    @return
        1D tensor ([height * width * channel])
        image height
        image width
    """
    img = Image.open(file_path).convert('RGB')
    img = img.resize(DEST_IMG_SIZE)
    return list(img.getdata()), img.height, img.width


def extract_image_pixels_from(file_path):
    """Extract the Image Matrix.

    @return
        3D tensor ([height][width][channel])
    """
    img = Image.open(file_path).convert('RGB')
    img = img.resize(DEST_IMG_SIZE)
    pixels = list(img.getdata())
    tensor_3d = []
    for row_index in range(img.height):
        from_to = (row_index * img.width, (row_index + 1) * img.width)
        tensor_3d.append(pixels[from_to[0]:from_to[1]])
    return tensor_3d


def export_to_json_file(tensor, file_path):
    """Export a tensor to a json file.
    """
    with open(file_path, 'w') as f:
        f.write(json.dumps(tensor))


if __name__ == '__main__':
    img_flat_tensor = []  # [batch_size * height * width * channel]
    img_shape = [0, 0]
    for an_img in get_files_from_dir(TARGET_DIR):
        new_tensor, img_shape[0], img_shape[1] = extract_flat_pixels_and_shape_from(an_img)
        img_flat_tensor += new_tensor
    np_img_flat_tensor = np.array(img_flat_tensor).ravel().tolist()
    # print(np_img_flat_tensor.size)
    # print(np_img_flat_tensor.shape)
    export_to_json_file(np_img_flat_tensor, DEST_DIR + 'data.json')
