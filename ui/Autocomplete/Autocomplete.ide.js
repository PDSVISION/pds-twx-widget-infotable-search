TW.IDE.Widgets.Autocomplete = function () {
    "use strict";
    this.widgetIconUrl = function () {
        return "../Common/extensions/AutocompleteWidget-extension/ui/" +
            "Autocomplete/Autocomplete.ide.png";
    };

    this.widgetProperties = function () {
        return {
            'name': 'Autocomplete',
            'description': 'Enables selection of items from an autosuggested list',
            'category': ['Common'],
            'isResizable': true,
            'supportsAutoResize': true,
            'supportsLabel': true,
            'isExtension': true,
            'properties': {
                'MinimumLength': {
                    'isEditable': true,
                    'baseType': 'INTEGER',
                    'defaultValue': 3,
                    'description': 'Set the minimum number of characters after you want the widget to fire the search event',
                },
                'MaximumResults': {
                    'isEditable': true,
                    'baseType': 'INTEGER',
                    'defaultValue': -1,
                    'description': 'Set the maximum number of results shown in the list. Default value is -1, which sets no limit',
                },
                'ChangedText': {
                    'isEditable': false,
                    'baseType': 'STRING',
                    'description': 'Text currently typed in the input box',
                    'isBindingSource': true
                },
                'SelectedText': {
                    'isEditable': false,
                    'baseType': 'STRING',
                    'description': 'Text that was selected from the suggestion list',
                    'isBindingSource': true
                },
                'AutoFocus': {
                    'isEditable': true,
                    'baseType': 'BOOLEAN',
                    'defaultValue': true,
                    'description': 'If set to true the first item will automatically be focused when the menu is shown',
                },
                'Data': {
                    'isBindingTarget': true,
                    'isEditable': false,
                    'baseType': 'INFOTABLE',
                    'warnIfNotBoundAsTarget': true
                },
                'DisplayField': {
                    'description': 'The infotable field which represents the value that will be displayed',
                    'isVisible': true,
                    'isEditable': true,
                    'baseType': 'FIELDNAME',
                    'sourcePropertyName': 'Data'
                },
                'ValueField': {
                    'description': 'Field to use for SelectedText, only when the SendValueAsSelectedText is true',
                    'baseType': 'FIELDNAME',
                    'sourcePropertyName': 'Data'
                },
                'SendValueAsSelectedText': {
                    'isEditable': true,
                    'baseType': 'BOOLEAN',
                    'defaultValue': false,
                    'description': 'If set to true the the value will be sent as the SelectedText back to the platform',
                },
                'Style': {
                    'description': TW.IDE.I18NController.translate('tw.textbox-ide.properties.style.description'),
                    'baseType': 'STYLEDEFINITION',
                    'defaultValue': 'DefaultTextBoxStyle'
                },
                'TabSequence': {
                    'description': 'Tab sequence index',
                    'baseType': 'NUMBER',
                    'defaultValue': 0
                }
            }
        };
    };
    this.widgetEvents = function () {
        return {
            'TextChanged': {
                'description': 'Triggered whenever a new alphanumeric is inserted in the search box. Should be the input of a Service used for search serve-side'
            },
            'TextSelected': {
                'description': 'Triggered whenever the user selects a suggested item, via mouse click or arrow+Enter'
            }
        };
    };

    this.renderHtml = function () {
        var html = '';
        html += '<div class="widget-content widget-Autocomplete">';
        html += '<span>Autocomplete here</span>';
        html += '</div>';
        return html;
    };

    this.afterRender = function () {
    };

    this.afterSetProperty = function (name, value) {
        return false;
    };

};