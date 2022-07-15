const slugify = require("slugify");

class LabelService{
    validateLabelData = (data, is_edit =  false) => {
        // name, image, type: banner, brand, status: [active, inactive]
        let err = {}
        if (!data.title) {
            err["title"] = "Title is required"
        } else {
            delete err['title']
        }

        if (!is_edit){
            if (!data.image) {
                err["image"] = "Image is required"
            } else {
               delete err['image']
            }
        } 

        if (!data.type) {
            err["type"] = "Type is required"
        } else {
            if (data.type !== "banner" && data.type !== "brand") {
                
                err['type'] = "Either Banner or brand is only required"
                
            } else {
                delete err['type']
            }
        }

        if (!data.status) {
            err["status"] = "Status is required"
        } else {
            if (data.status != "active" || data.status != "inactive") {
                delete err['status']
            } else {
                err['status'] = "Either active or inactive can only be the value for status"
                
            }
        }

        if (Object.keys(err).length > 0) {
            return err
        } else {
            return null
        }


        
    }

    getLabelSlug = (str) => {
        return slugify(str.toLowerCase())
    }
}

module.exports = LabelService