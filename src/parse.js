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

const getQueryStringParams = qs => {
  const getQuery = /([?&].*)/
  const matches = getQuery.exec(qs)
  const params = {}

  if (matches && matches.length) {
    const urlParams = new URLSearchParams(matches[1])
    for (const [key, value] of urlParams.entries()) {
      params[key] = value
    }
  }
  return params
}

const formats = {
  'querystring' : getQueryStringParams,
}

export default (input, format = 'querystring') => {
  return formats[format] && typeof formats[format] === 'function' && formats[format](input) || {}
}
