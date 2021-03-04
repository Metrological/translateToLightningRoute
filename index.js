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

import { parse, translate, output } from './src'

const defaultMapping = {
  default: 'Home',
  remap: {
    launchpoint: (val, deeplinkObj) => {
      val === 'section' ? deeplinkObj.sectionName : val
    },
  },
  sections: {
    home: '/pages/home',
    player: '/playingmodule',
    bla: () => {},
  },
  inputVariables: ['query', ['assetType', 'assetId'], 'entityId'],
}

//https://www.tvapp.com/x1?launchpoint=home&lmt=0&us_privacy=1-N-
//https://www.tvapp.com/x1?launchpoint=section&lmt=0&us_privacy=1-N-&sectionName=home
//--> /home?(params)

//https://www.tvapp.com/x1?launchpoint=section&lmt=0&us_privacy=1-N-&sectionName=settings
//--> /settings

export default async (
  hashOrObject,
  config = {
    inputFormat: 'querystring',
    outputFormat: 'url',
    mapping: { ...defaultMapping },
  }
) => {
  const deepLinkObject = await parse(hashOrObject, config.inputFormat)
  const mappedDeeplinkObject = await translate(deepLinkObject, config.mapping)
  return await output(mappedDeeplinkObject, config.outputFormat)
}

// #/pages/:sectionName

// {
//     id: xx,
//     video: asd,
//     title: asdas
// }
