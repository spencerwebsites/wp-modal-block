/**
 * BLOCK: modal-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
	// ColorPalette,
} = wp.blockEditor;
const { TextControl, PanelBody, PanelRow } = wp.components;
const { Fragment } = wp.element;
const { RichText } = wp.editor;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'scc/modal-info', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Modal Info', 'wp-modal-block' ), // Block title.
	description: __( 'Content that appears on screen before the toggle button', 'wp-modal-block' ),
	icon: 'info-outline', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'modal', 'wp-modal-block' ),
		__( 'popup', 'wp-modal-block' ),
		__( 'window', 'wp-modal-block' ),
	],
	parent: [ 'scc/modal-container' ],
	attributes: {
		buttonText: {
			type: 'string',
			source: 'text',
			selector: 'button',
			default: 'Toggle modal',
		},
		lock: {
			remove: true,
			move: true,
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {
		const { attributes, setAttributes } = props;

		const setButtonText = ( value ) => {
			setAttributes( {
				buttonText: value,
			} );
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title="Modal Settings"
						defaultOpen={ true }
					>
						<PanelRow>
							<TextControl
								label="Toggle Button Label"
								value={ attributes.buttonText }
								onChange={ ( value ) => setButtonText( value ) }
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
				<InnerBlocks
					renderAppender={ InnerBlocks.ButtonBlockAppender }
				/>
			</Fragment>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( { attributes } ) => {
		const blockProps = useBlockProps.save();

		return (
			<div { ...blockProps }>
				<InnerBlocks.Content />
				<RichText.Content
					tagName="button"
					className="scc-modal-info__open"
					value={ attributes.buttonText }
				/>
			</div>
		);
	},
} );
