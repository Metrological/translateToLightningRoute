/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2021 Metrological
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const defaultMapping = {
  normalize: {
    launchpoint: {
      to: 'section',
      fn: (val, deeplinkObj) => (val === 'section' ? deeplinkObj.sectionname : val),
    },
  },
  pathKey: 'section',
  paths: {
    home: '/page/home',
    detail: '/page/detail',
    playback: '/page/player/:assetId',
    search: '/search/:query?',
  },
  queryStringsToIgnore: ['section', 'sectionname'],
}

const normalizeInput = (input, mapping) => {
  return Object.keys(input).reduce((acc, key) => {
    const value = input[key]

    if (key in mapping.normalize) {
      acc[mapping.normalize[key].to] =
        mapping.normalize[key].fn && typeof mapping.normalize[key].fn === 'function'
          ? mapping.normalize[key].fn(value, input)
          : value
    } else {
      acc[key] = value
    }

    return acc
  }, {})
}

const remapInput = (input, mapping) => {
  return Object.keys(input).reduce(
    (acc, key, index, source) => {
      const value = input[key]

      // eslint-disable-next-line
      const regexp = new RegExp(':' + key + '\\??', 'g')
      if (acc.path.indexOf(':' + key) > -1) {
        acc.path = acc.path.replace(regexp, value)
      } else if (mapping.queryStringsToIgnore.indexOf(key) === -1) {
        acc.queryParams[key] = value
      }

      if (index === source.length - 1) {
        const hasPart = /\/:[^?/]+\?/g
        acc.path = hasPart.test(acc.path) ? acc.path.replace(hasPart, '') : acc.path
      }

      return acc
    },
    {
      path: mapping.paths[input[mapping.pathKey] || 'default'] || '/',
      queryParams: {},
    }
  )
}

export default (input, mapping) => {
  mapping = { ...defaultMapping, ...mapping }
  return remapInput(normalizeInput(input, mapping), mapping)
}
