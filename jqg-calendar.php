<?php 
		/*
		Plugin Name: JQGCalendar
		Plugin URI: https://github.com/AnnaAmidani/jqgcalendar
		Description: Plugin for displaying and managing events in a weekly calendar synchronized with Google
		Author: Anna Amidani
		Version: 1.0
		Author URI: https://github.com/AnnaAmidanihttps://github.com/AnnaAmidani/jqgcalendar
		*/


	// Definitions
	define( 'PLUGIN_NAME', 'jQuery Google Calendar' );

	// Includes
	require_once dirname( __FILE__ ) . '/admin/jqc-calendar-admin.php';



	/**
	 * Loads text domain for internationalization
	 *
	 * @package jQuery Google Calendar
	 * @since   1.0
	 */	
	function jqg_init() {
		load_plugin_textdomain( 'jqg-calendar', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
	}
	add_action( 'plugins_loaded', 'jqg_init' );

	
	

	/**
	 * Enqueues required scripts & styles, and passes PHP variables to jQuery file
	 *
	 * @package jQuery Responsive Select Menu
	 * @since   1.0
	 * /
	function jqg_scripts() {

		// Include JQC scripts
		wp_enqueue_script( 'jqg-jquery', plugins_url( '/jqg-jquery.js', __FILE__ ), array( 'jquery' ) );

/**
		// Add PHP plugin variables to the $params[] array to pass to jQuery
		$params = array (
			'containers' => get_option( 'jqg-containers' ),
			'width' => get_option( 'jqg-width' ),
			'firstItem' => get_option( 'jqg-first-term' ),
			'indent' => get_option( 'jqg-sub-item-spacer' ),
			'showCurrentPage' => get_option( 'jqg-show-current-page' ),
			'hideEmptyLinks' => get_option( 'jqg-hide-empty-links' ),
			'disableEmptyLinks' => get_option( 'jqg-disable-empty-links' ),
		);

		// Pass PHP variables to jQuery script
		wp_localize_script( 'jqg-jquery', 'jqg_params', $params );

		// Load custom CSS file
		wp_enqueue_style( 'jqg-css', plugin_dir_url( __FILE__ ) . 'jqg.css' );

		// Append custom CSS based on plugin settings
		$containers = str_replace(', ', ',', get_option( 'jqg-containers' ) );
		if ( ! empty( $containers ) ) {
		    // Get menu <ul>'s inside container(s)
		    $containers = explode( ',', $containers );
		    foreach( $containers as &$container ) {
		    	$container = '.jquery ' . $container . ' ul';
		    }
		    $containers = implode( ', ', $containers );
			$width = get_option( 'jqg-width' );

			$css = "
			@media (max-width: {$width}px) {
			
				{$containers} {
					display: none !important;
				}

				.jquery-responsive-select-menu {
					display: inline-block;
					max-width: 100%;
				}

			}";

			wp_add_inline_style( 'jqg-css', $css );
		}

	}
	add_action( 'wp_enqueue_scripts', 'jqg_scripts', 0 );
	**/

	
	


		
	

?>
