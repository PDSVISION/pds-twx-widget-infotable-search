TW.Runtime.Widgets.Autocomplete = function () {
    "use strict";
    var valueElem;
    var displayField = '';
    var valueField = '';
    var SendValueAsSelected = false;


    this.runtimeProperties = function () {
        return {
            'supportsAutoResize': true
        };
    };

    this.renderHtml = function () {
        var formatResult = TW.getStyleFromStyleDefinition(this.getProperty('Style', 'DefaultTextBoxStyle'));
        var border = TW.getStyleCssBorderFromStyle(formatResult);

        var textSizeClass = 'textsize-normal ';
        if (formatResult !== undefined) {
            textSizeClass = TW.getTextSizeClassName(formatResult.textSize);
        }
        var cssTextBoxText = TW.getStyleCssTextualFromStyle(formatResult);
        var tabIndex = this.getProperty('TabSequence');

        return '<div class="widget-content widget-Autocomplete"><input placeholder="Search..." width="100%"  box-sizing="border-box" class="autocomplete ' + textSizeClass + '"  tabindex="' + tabIndex + '" style="' + cssTextBoxText + ' ' + border + '"></div>';
    };

    this.afterRender = function () {
        valueElem = this.jqElement.find(".autocomplete");
        valueElem.autocomplete();
        var MinimumLength = this.getProperty('MinimumLength');
        var AutoFocus = this.getProperty('AutoFocus');
        var Width = this.getProperty('Width');
        var Height = this.getProperty('Height');

        valueField = this.getProperty('ValueField');
        displayField = this.getProperty('DisplayField');
        SendValueAsSelected = this.getProperty('SendValueAsSelectedText');

        valueElem.autocomplete("option", "minLength", MinimumLength);
        valueElem.autocomplete("option", "autoFocus", AutoFocus);
        valueElem.width(Width);
        valueElem.height(Height);

        var widgetElement = this;
        valueElem.on("autocompleteselect", function (event, ui) {
            var str_SelectedText;

            if (SendValueAsSelected) {
                str_SelectedText = ui.item.value;
            } else {
                str_SelectedText = ui.item.label;
            }

            widgetElement.setProperty('SelectedText', str_SelectedText);
            this.value = str_SelectedText;
			
			//NET Hack :P
            document.querySelector("input.autocomplete").value = "";
            
            widgetElement.jqElement.triggerHandler('TextSelected');
            event.preventDefault();
        });

        valueElem.on("keyup", function () {
                widgetElement.setProperty('ChangedText', this.value);
                widgetElement.jqElement.triggerHandler('TextChanged');
            }
        );
        
    };

    this.processIncomingData = function (data) {
        //this function processes the incoming ThingWorx data array and generates JQuery Autocomplete compatible source arrays
        //the jquery autocomplete arrays must be in the format [{label:"asdas",value:"val"},...]
        var outputArray = [];
        for (var i = 0; i < data.length; i++) {
            var labelValue = data[i][displayField];
            var valueValue = data[i][valueField].toString();
            outputArray.push({label: labelValue, value: valueValue});
        }
        return outputArray;
    };


    this.updateProperty = function (updatePropertyInfo) {
        if (updatePropertyInfo.TargetProperty === "Data") {
            var dataRows = updatePropertyInfo.ActualDataRows;
            var outputArray = this.processIncomingData(dataRows);
            var MaximumResults = this.getProperty('MaximumResults');
            valueElem.autocomplete({
                source: function(request, response) {
                    var results = $.ui.autocomplete.filter(outputArray, request.term);
                    response(results.slice(0, MaximumResults));
                }
            });
        }

    };

    this.resetInputToDefault = function () {
        /**
         * Do not clear "SelectedText", "ChangedText", or "source"
         * As these are needed for subsequent navigation,
         * And will be replaced as soon as the user searches again anyway.
         **/
        valueElem.val('');
        valueElem.autocomplete('close');
    };
};
