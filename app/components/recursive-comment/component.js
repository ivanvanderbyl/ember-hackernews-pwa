import Component from '@ember/component'
const Comment = Component.extend({
	tagName: 'article',

	item: null,

	classNames: ['Comment'],
})

Comment.reopenClass({
	positionalParams: ['item'],
})

export default Comment
