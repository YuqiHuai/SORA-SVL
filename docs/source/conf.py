# SPDX-FileCopyrightText: (c) 2024 Yuqi Huai.
# SPDX-License-Identifier: BSD-3-Clause
# Modifications Copyright (c) 2025 Xronos Inc.

project = 'SORA SVL'
copyright = '2024, Yuqi Huai'
author = 'Yuqi Huai'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    'sphinx_rtd_theme',
    'sphinx.ext.autosectionlabel',
]

templates_path = ['_templates']
exclude_patterns = []
autosectionlabel_prefix_document = True



# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'sphinx_rtd_theme'
html_static_path = ['_static']
