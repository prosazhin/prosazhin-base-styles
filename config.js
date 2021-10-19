const StyleDictionary = require('style-dictionary');
const transformer = StyleDictionary.transform['attribute/cti'].transformer;

const propertiesToCTI = {
	'width': { category: 'size', type: 'dimension' },
	'min-width': { category: 'size', type: 'dimension' },
	'max-width': { category: 'size', type: 'dimension' },
	'height': { category: 'size', type: 'dimension' },
	'min-height': { category: 'size', type: 'dimension' },
	'max-height': { category: 'size', type: 'dimension' },
	'border-width': { category: 'size', type: 'border', item: 'width' },
	'border-radius': { category: 'size', type: 'border', item: 'width' },
	'border-color': { category: 'color', type: 'border' },
	'background-color': { category: 'color', type: 'background' },
	'color': { category: 'color', type: 'font' },
	'text-color': { category: 'color', type: 'font' },
	'padding': { category: 'size', type: 'padding' },
	'padding-vertical': { category: 'size', type: 'padding' },
	'padding-horizontal': { category: 'size', type: 'padding' },
	'icon': { category: 'content', type: 'icon' },
	'font-size': { category: 'size', type: 'font' },
	'line-height': { category: 'size', type: 'line-height' },
	'size': { category: 'size', type: 'icon' }
};

const CTITransform = {
	type: `attribute`,
	transformer: (prop) => {
		if (prop.path[0] === 'component') {
			return propertiesToCTI[prop.path[prop.path.length - 1]];
		} else {
			return transformer(prop);
		}
	},
};

module.exports = {
	transform: {
		'attribute/cti': CTITransform
	},
	source: ['tokens/**/*.json'],
	platforms: {
		scss: {
			transforms : ['attribute/cti', 'name/cti/snake', 'color/hex', 'size/px'],
			buildPath: 'build/',
			files: [{
				destination: 'variables.scss',
				format: 'scss/variables'
			}]
		}
	},
};
