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

const constructHash = (input) => {
  const queryString = new URLSearchParams(input.queryParams).toString()
  return (queryString ? '?' + queryString : '') + '#' + input.path
}

const formats = {
  hash: constructHash,
}

export default (input, format = 'hash') => {
  return (
    (formats[format] && typeof formats[format] === 'function' && formats[format](input)) || input
  )
}
