import React from 'react';
import ImageUploading from 'react-images-uploading';
import {
    IconButton,
    Button,

} from "@material-ui/core";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import ClearIcon from '@material-ui/icons/Clear';
import UpdateIcon from '@material-ui/icons/Update';

export function ImageUpload(props) {
    var {
        onloadImageUpload
    } = props

    const [images, setImages] = React.useState([]);
    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
       
        onloadImageUpload(imageList);

        // onloadImageUpload = () => {
        //     return imageList;
        // }

        // if (images.length) {
        //     alert('as')
            
        // }
    };

    return (
        <div>
            <ImageUploading
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        {images.length === 0 ? <div style={{
                            border: '1px solid silver',
                            padding: '21px 0px 21px 111px'
                        }}>
                            <Button variant="contained" color="primary"
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                <CameraAltIcon fontSize="large" />

                            </Button>
                        </div> : <div>
                            &nbsp;
                        {imageList.map((image, index) => (
                            <div key={index} className="row" style={{
                                border: '1px solid silver',
                                marginTop: '-25px',
                                padding: '10px'
                            }}>
                                <div className="col-sm-7">
                                    <img src={image['data_url']} alt="" height="100" width="150" />
                                </div>

                                <div className="col-sm-3">
                                    <div className="col-sm-6" >
                                        <Button variant="contained" color="primary" onClick={() => onImageUpdate(index)}><UpdateIcon /></Button>
                                    </div>

                                    <div className="col-sm-6" style={{ marginTop: '5px' }}>
                                        <Button variant="contained" color="secondary" onClick={() => onImageRemove(index)}><ClearIcon /></Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}