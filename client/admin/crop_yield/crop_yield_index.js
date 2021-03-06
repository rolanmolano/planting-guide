import { cropYields } from '../../../lib/collections/crop_yield.js'

Template.CropYield.helpers ({
	cropYields: function() {
		const _id = FlowRouter.getParam('location_id')
		const cropYield   = cropYields.find({locationID: _id }).fetch()
		return cropYield
	}
	 
})


Template.CropYield.events({
	'click #add-crop-yield-button' : function (e) {
		const id = FlowRouter.getParam('location_id')
		console.log(id)	
		//kulang p
		 FlowRouter.go(`/addCropYield/${id}`)
	},

	'click #exit-crop-yield-button' : function (e) {
		//const id = FlowRouter.getParam('location_id')
		//console.log(id)	
		//kulang p
		 FlowRouter.go(`/location`)
	}

})