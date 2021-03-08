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

import { parse, translate, output } from '.'

export default (
  hashOrObject,
  config = {
    inputFormat: 'querystring',
    outputFormat: 'hash',
    mapping: {},
  }
) => {
  const deepLinkObject = parse(hashOrObject, config.inputFormat)
  const translatedDeepLinkObject = translate(deepLinkObject, config.mapping)
  return output(translatedDeepLinkObject, config.outputFormat)
}
