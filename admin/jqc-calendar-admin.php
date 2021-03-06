<?php 

	/**
	 * Creates admin settings page
	 *
	 * @package jQuery Responsive Select Menu
	 * @since   1.0
	 */
	function jqg_do_settings_page() {
		// Create admin menu item
		add_options_page( PLUGIN_NAME, 'JQuery Google Calendar', 'manage_options', 'jqg-calendar', 'jqg_output_settings');
	}
	add_action('admin_menu', 'jqg_do_settings_page');




	/**
	 * Outputs settings page with form
	 *
	 * @package jQuery Google Calendar
	 * @since   1.0
	*/	 
	function jqg_output_settings() { ?>
		<div class="wrap">
			<?php screen_icon(); ?>
			<h2><?php echo PLUGIN_NAME; ?></h2>
			<form method="post" action="options.php">
				<?php settings_fields( 'jquery-calendar' ); ?>
				<?php do_settings_sections( 'jquery-calendar' ); ?>
				<?php submit_button(); ?>
			</form>
		</div>
	<?php }



