/**
 * Copyright 2017 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {isJsonLdScriptTag} from '../../../src/dom';
import {tryParseJson} from '../../../src/core/types/object/json';
import {user} from '../../../src/log';

const TAG = 'getJsonLd';

/**
 * @param {!Node} root
 * @return {?JsonObject}
 */
export function getJsonLd(root) {
  const scriptTag = root.querySelector('script[type="application/ld+json"]');

  if (!scriptTag || !isJsonLdScriptTag(scriptTag)) {
    return null;
  }

  return (
    tryParseJson(scriptTag.textContent, (e) => {
      user().error(TAG, 'Failed to parse ld+json. Is it valid JSON?', e);
    }) || null
  );
}
