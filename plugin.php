<?php
/**
 * Plugin Name: Modal Block
 * Plugin URI: https://github.com/spencerwebsites/wp-modal-block
 * Description: Adds a modal block type for custom popups.
 * Author: Spencer Creative Co.
 * Author URI: https://spencercreative.co
 * Version: 1.2.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
