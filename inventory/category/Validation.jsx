
const validation = (values) => {
    let errors = {
        show:true
    };
    if(!values.categoryName){
        errors.categoryName = "Name is required"
    }

    return errors;
}

export default validation;