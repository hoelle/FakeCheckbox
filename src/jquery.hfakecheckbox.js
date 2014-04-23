/*
 hFakeCheckbox v0.2
 (c) 2014 Hoelle Development e.U. - hoelle.net
 license: http://www.opensource.org/licenses/mit-license.php
 */

(function ($) {
	var hFakeCheckboxNamespace = 'hFakeCheckbox',
		methods = {
			init: function (options) {
				var settings = $.extend({
						// place default settings here
					}, options),
					checkboxCss = {
						display: 'block',
						position: 'absolute',
						width: '100%',
						height: '100%',
						left: 0,
						top: 0,
						opacity: 0,
						cursor: 'pointer',
						border: 0,
						outline: 0
					};

				return this.each(function () {
					var $this = $(this),
						data = $this.data(hFakeCheckboxNamespace);

					// If the plugin hasn't been initialized yet
					if (!data) {
						/*
						 Do more setup stuff here
						 */

						var $container = $('<div class="fake-checkbox" />'),
							$checkbox = $this.clone().removeClass('fake-checkbox');

						$container.addClass($checkbox.attr('class'));
						$checkbox.addClass('origin').css(checkboxCss);
						$container.append($checkbox);
						$this.replaceWith($container);

						$checkbox.change(function (e) {
							if ($(this).prop('checked')) {
								$container.addClass('checked');
							}
							else {
								$container.removeClass('checked');
							}
						}).change();

						$this.data(hFakeCheckboxNamespace, $.extend(settings, {
							target: $this,
							container: $container,
							checkbox: $checkbox
						}));
						data = $this.data(hFakeCheckboxNamespace);
					}

				});
			},

			destroy: function () {
				return this.each(function () {
					var $this = $(this),
						data = $this.data(hFakeCheckboxNamespace);

					// Namespacing FTW
					$(window).unbind('.' + hFakeCheckboxNamespace);
					data.container.replaceWith(data.checkbox.removeClass('origin'));
					$this.removeData(hFakeCheckboxNamespace);
				});
			},
		};

	$.fn.hFakeCheckbox = function (method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.hFakeCheckbox');
		}
	};

})(jQuery);