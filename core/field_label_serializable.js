/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Non-editable, serializable text field. Behaves like a
 *    normal label but is serialized to XML. It may only be
 *    edited programmatically.
 */
'use strict';

goog.module('Blockly.FieldLabelSerializable');
goog.module.declareLegacyNamespace();

goog.require('Blockly.FieldLabel');
goog.require('Blockly.fieldRegistry');
goog.require('Blockly.utils');
goog.require('Blockly.utils.object');


/**
 * Class for a non-editable, serializable text field.
 * @param {*} opt_value The initial value of the field. Should cast to a
 *    string. Defaults to an empty string if null or undefined.
 * @param {string=} opt_class Optional CSS class for the field's text.
 * @param {Object=} opt_config A map of options used to configure the field.
 *    See the [field creation documentation]{@link https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/label-serializable#creation}
 *    for a list of properties this parameter supports.
 * @extends {Blockly.FieldLabel}
 * @constructor
 *
 */
const FieldLabelSerializable = function(opt_value, opt_class, opt_config) {
  FieldLabelSerializable.superClass_.constructor.call(
      this, opt_value, opt_class, opt_config);
};
Blockly.utils.object.inherits(FieldLabelSerializable,
    Blockly.FieldLabel);

/**
 * Construct a FieldLabelSerializable from a JSON arg object,
 * dereferencing any string table references.
 * @param {!Object} options A JSON object with options (text, and class).
 * @return {!FieldLabelSerializable} The new field instance.
 * @package
 * @nocollapse
 */
FieldLabelSerializable.fromJson = function(options) {
  const text = Blockly.utils.replaceMessageReferences(options['text']);
  // `this` might be a subclass of FieldLabelSerializable if that class doesn't
  // override the static fromJson method.
  return new this(text, undefined, options);
};

/**
 * Editable fields usually show some sort of UI indicating they are
 * editable. This field should not.
 * @type {boolean}
 */
FieldLabelSerializable.prototype.EDITABLE = false;

/**
 * Serializable fields are saved by the XML renderer, non-serializable fields
 * are not.  This field should be serialized, but only edited programmatically.
 * @type {boolean}
 */
FieldLabelSerializable.prototype.SERIALIZABLE = true;

Blockly.fieldRegistry.register(
    'field_label_serializable', FieldLabelSerializable);

exports = FieldLabelSerializable;
