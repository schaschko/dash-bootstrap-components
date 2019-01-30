import React from 'react';
import PropTypes from 'prop-types';
import {omit} from 'ramda';
import classNames from 'classnames';

/**
 * A basic HTML textarea for entering multiline text based on the corresponding
 * component in dash-core-components
 *
 */
class Textarea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: props.value};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value});
  }

  render() {
    const {setProps, className, invalid, valid, bs_size, debounce} = this.props;
    const {value} = this.state;

    const classes = classNames(
      className,
      invalid && 'is-invalid',
      valid && 'is-valid',
      bs_size ? `form-control-${bs_size}` : false,
      'form-control'
    );

    return (
      <textarea
        value={value}
        className={classes}
        onChange={e => {
          const newValue = e.target.value;
          if (!debounce && setProps) {
            setProps({value: newValue});
          } else {
            this.setState({value: newValue});
          }
        }}
        onBlur={() => {
          if (setProps) {
            const payload = {
              n_blur: this.props.n_blur + 1,
              n_blur_timestamp: new Date()
            };
            if (debounce) {
              payload.value = value;
            }
            setProps(payload);
          }
        }}
        onClick={() => {
          if (setProps) {
            setProps({
              n_clicks: this.props.n_clicks + 1,
              n_clicks_timestamp: new Date()
            });
          }
        }}
        {...omit(
          [
            'setProps',
            'value',
            'valid',
            'invalid',
            'bs_size',
            'className',
            'n_blur',
            'n_blur_timestamp',
            'n_submit',
            'n_submit_timestamp',
            'debounce'
          ],
          this.props
        )}
      />
    );
  }
}

Textarea.propTypes = {
  /**
   * The ID of this component, used to identify dash components
   * in callbacks. The ID needs to be unique across all of the
   * components in an app.
   */
  id: PropTypes.string,

  /**
   * The value of the textarea
   */
  value: PropTypes.string,

  /**
   * The element should be automatically focused after the page loaded.
   */
  autoFocus: PropTypes.string,

  /**
   * Defines the number of columns in a textarea.
   */
  cols: PropTypes.string,

  /**
   * Indicates whether the user can interact with the element.
   */
  disabled: PropTypes.string,

  /**
   * Indicates the form that is the owner of the element.
   */
  form: PropTypes.string,

  /**
   * Defines the maximum number of characters allowed in the element.
   */
  maxLength: PropTypes.string,

  /**
   * Defines the minimum number of characters allowed in the element.
   */
  minLength: PropTypes.string,

  /**
   * Name of the element. For example used by the server to identify the fields in form submits.
   */
  name: PropTypes.string,

  /**
   * Provides a hint to the user of what can be entered in the field.
   */
  placeholder: PropTypes.string,

  /**
   * Indicates whether the element can be edited.
   */
  readOnly: PropTypes.string,

  /**
   * Indicates whether this element is required to fill out or not.
   */
  required: PropTypes.string,

  /**
   * Defines the number of rows in a text area.
   */
  rows: PropTypes.string,

  /**
   * Indicates whether the text should be wrapped.
   */
  wrap: PropTypes.string,

  /**
   * Defines a keyboard shortcut to activate or add focus to the element.
   */
  accessKey: PropTypes.string,

  /**
   * Often used with CSS to style elements with common properties.
   */
  className: PropTypes.string,

  /**
   * Indicates whether the element's content is editable.
   */
  contentEditable: PropTypes.string,

  /**
   * Defines the ID of a <menu> element which will serve as the element's context menu.
   */
  contextMenu: PropTypes.string,

  /**
   * Defines the text direction. Allowed values are ltr (Left-To-Right) or rtl (Right-To-Left)
   */
  dir: PropTypes.string,

  /**
   * Defines whether the element can be dragged.
   */
  draggable: PropTypes.string,

  /**
   * Prevents rendering of given element, while keeping child elements, e.g. script elements, active.
   */
  hidden: PropTypes.string,

  /**
   * Defines the language used in the element.
   */
  lang: PropTypes.string,

  /**
   * Indicates whether spell checking is allowed for the element.
   */
  spellCheck: PropTypes.string,

  /**
   * Defines CSS styles which will override styles previously set.
   */
  style: PropTypes.object,

  /**
   * Overrides the browser's default tab order and follows the one specified instead.
   */
  tabIndex: PropTypes.string,

  /**
   * Text to be displayed in a tooltip when hovering over the element.
   */
  title: PropTypes.string,

  /**
   * Dash-assigned callback that gets fired when the value changes.
   */
  setProps: PropTypes.func,

  /**
   * Set the size of the Textarea, valid options are 'sm', 'md', or 'lg'
   */
  bs_size: PropTypes.string,

  /**
   * Apply valid style to the Textarea
   */
  valid: PropTypes.bool,

  /**
   * Apply invalid style to the Textarea
   */
  invalid: PropTypes.bool,

  /**
   * Number of times the input lost focus.
   */
  n_blur: PropTypes.number,
  /**
   * Last time the input lost focus.
   */
  n_blur_timestamp: PropTypes.number,

  /**
   * An integer that represents the number of times
   * that this element has been clicked on.
   */
  n_clicks: PropTypes.number,

  /**
   * An integer that represents the time (in ms since 1970)
   * at which n_clicks changed. This can be used to tell
   * which button was changed most recently.
   */
  n_clicks_timestamp: PropTypes.number,

  /**
   * If true, changes to input will be sent back to the Dash server only on enter or when losing focus.
   * If it's false, it will sent the value back on every change.
   */
  debounce: PropTypes.bool
};

Textarea.defaultProps = {
  n_blur: 0,
  n_blur_timestamp: -1,
  n_clicks: 0,
  n_clicks_timestamp: -1,
  debounce: false
};

export default Textarea;
