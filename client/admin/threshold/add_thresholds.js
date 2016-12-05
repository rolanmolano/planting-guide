import { cropsCollection } from '../../../lib/collections/crops.js'
import { cropVarietiesCollection  } from '../../../lib/collections/crop_varieties.js'

Template.AddThreshold.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            Meteor.subscribe('crops')
            Meteor.subscribe('cropVarieties')
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.AddThreshold.helpers ({
    dataCrop: function() {
        const dataCrop  = cropsCollection.find({}).fetch()         
        return dataCrop
    },

    dataVariety: function() {
        const dataVariety  = cropVarietiesCollection.find({}).fetch()         
        return dataVariety
    }     
})



Template.AddThreshold.events ({

    'change #cropSelectionThresholdAdd' : function(e){
        //get the value of  the  province field
        const cropField = $('#cropSelectionThresholdAdd') 
        const cropID =  cropField.val()    

        //gets the variety field and empty its options
        const varietyField = $('#cropVarietySelectionThresholdAdd')
        varietyField.empty()
        //retrieves the list of city as specified by what province is selected
        const dataVariety  = cropVarietiesCollection.find({cropID: cropID}).fetch() 
        //adds options to the select tag
        dataVariety.forEach((item) => {
            varietyField.append("<option>" + item.variety + "</option>");
        });   

    },

	'click #add-threshold ' : function (e) {
		
		const cropType = $('#cropSelectionThresholdAdd').find('option:selected').text()
        const cropVariety = $('#cropVarietySelectionThresholdAdd').find('option:selected').text()        
        const days = $('#days').find('option:selected').text()
        const amountRainfallField = $('#amountRainfall')
        const amountRainfall = amountRainfallField.val()
		
		Meteor.call ('add-thresholds',cropType,cropVariety,days,amountRainfall)		
		amountRainfallField.val = " "

		FlowRouter.go ('/threshold')

	},
	'click #cancel-threshold ' : function (e) {
        
        FlowRouter.go('/threshold')

    }
})