

import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Breadcrumb } from "matx";
import { Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import {
    Button,
} from "@material-ui/core";
import AddSKUAddition from './AddSKUAddition';
import { Slide } from '@progress/kendo-react-animation';

const useStyles = makeStyles(theme => ({
    radiobtn: {
        border: '1px solid silver',
        paddingLeft: '10px',
        borderRadius: '4px'
    },
    submitbtn:{
        float:'right'
    },
    styleformbox:{
        border:'1px solid silver',
        padding: '10px',
    }
}));

const ProductSKUAddition = () => {
    const GreenRadio = withStyles({
        root: {
            color: green[400],
            "&$checked": {
                color: green[600]
            }
        },
        checked: {}
    })(props => <Radio color="default" {...props} />);

    const classes = useStyles();
    const [selectedValue, setSelectedValue] = React.useState({
        no: '',
        yes: '1'
    });

    function handleChange(event) {
        if (event.target.value === '1') {
            setSelectedValue({
                yes: '1',
            })
        } else {
            setSelectedValue({
                no: '0',
            })
        }
    }

    const [show, setShow] = React.useState(false);
    const [callbackCalls, setCallbackCalls] = React.useState([]);

    const onClick = () => {
        setShow(!show);
    };

    const onEnter = event => {
        const calls = callbackCalls.slice();
        calls.unshift("component will enter");
        setCallbackCalls(calls);
    };

    const renderLogs = () => {
        console.log(callbackCalls)
        return callbackCalls.map((log, index) => {
            return <div key={index}>

                <Form className={classes.styleformbox}>
                    <div className="row">
                        <div className="col-sm-6">
                            <Form.Group>
                                <Form.Label>Package Size<sup>*</sup></Form.Label>
                                <Form.Control type="text" placeholder="Package Size " />
                            </Form.Group>
                        </div>

                        <div className="col-sm-6">
                            <Form.Group>
                                <Form.Label>Product MRP<sup>*</sup></Form.Label>
                                <Form.Control type="text" placeholder="Product MRP" />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <Form.Group>
                                <Form.Label>SKU Code</Form.Label>
                                <Form.Control type="text" placeholder="SKU Code " />
                            </Form.Group>
                        </div>

                        <div className="col-sm-6">
                            <Form.Group>
                                <Form.Label>Strike Price</Form.Label>
                                <Form.Control type="text" placeholder="Strike Price" />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <Form.Group>
                                <Form.Label>Quantity Editable<sup>*</sup></Form.Label>
                                <div className={classes.radiobtn}>
                                    <label>YES</label>
                                    <Radio
                                        checked={selectedValue.yes === '1'}
                                        onChange={handleChange}
                                        value={selectedValue.yes}
                                        name="yes"
                                        inputProps={{ "aria-label": "active" }}
                                    />
                                    <label>NO</label>
                                    <Radio
                                        checked={selectedValue.no === '0'}
                                        onChange={handleChange}
                                        value={selectedValue.no}
                                        name="no"
                                        inputProps={{ "aria-label": "inactive" }}
                                    />
                                </div>
                            </Form.Group>
                        </div>
                        <div className="col-sm-6">
                            <Form.Group>
                                <Form.Label>SKU Bar-code</Form.Label>
                                <Form.Control type="text" placeholder="SKU Bar-code " />
                            </Form.Group>
                        </div>
                    </div>

                    <div>
                        {selectedValue.yes === '1' ? <div className="row">
                            <div className="col-sm-6">
                                <Form.Group>
                                    <Form.Label>SKU MF (Qty per Kg)<sup>*</sup></Form.Label>
                                    <Form.Control type="text" placeholder="SKU MF " />
                                </Form.Group>
                            </div>

                            <div className="col-sm-6">
                                <Form.Group>
                                    <Form.Label>Price Per kg/lt (Auto generated)</Form.Label>
                                    <Form.Control type="text" placeholder="Price Per kg/lt " />
                                </Form.Group>
                            </div>
                        </div> : null}
                    </div>
                </Form><br></br><hr></hr>
            </div>
        });
    };

    const children = show ? <div className="content">CONTENT</div> : null;
    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "SKU Addition", path: "/products/skuaddition" },
                        { name: "Inventory" }
                    ]}
                /><hr></hr>

                <Form className={classes.styleformbox}>
                    <div className="row">
                        <div className="col-sm-6">
                            <Form.Group>
                                <Form.Label>Package Size<sup>*</sup></Form.Label>
                                <Form.Control type="text" placeholder="Package Size " />
                            </Form.Group>
                        </div>

                        <div className="col-sm-6">
                            <Form.Group>
                                <Form.Label>Product MRP<sup>*</sup></Form.Label>
                                <Form.Control type="text" placeholder="Product MRP" />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <Form.Group>
                                <Form.Label>SKU Code</Form.Label>
                                <Form.Control type="text" placeholder="SKU Code " />
                            </Form.Group>
                        </div>

                        <div className="col-sm-6">
                            <Form.Group>
                                <Form.Label>Strike Price</Form.Label>
                                <Form.Control type="text" placeholder="Strike Price" />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <Form.Group>
                                <Form.Label>Quantity Editable<sup>*</sup></Form.Label>
                                <div className={classes.radiobtn}>
                                    <label>YES</label>
                                    <Radio
                                        checked={selectedValue.yes === '1'}
                                        onChange={handleChange}
                                        value={selectedValue.yes}
                                        name="yes"
                                        inputProps={{ "aria-label": "active" }}
                                    />
                                    <label>NO</label>
                                    <Radio
                                        checked={selectedValue.no === '0'}
                                        onChange={handleChange}
                                        value={selectedValue.no}
                                        name="no"
                                        inputProps={{ "aria-label": "inactive" }}
                                    />
                                </div>
                            </Form.Group>
                        </div>
                        <div className="col-sm-6">
                            <Form.Group>
                                <Form.Label>SKU Bar-code</Form.Label>
                                <Form.Control type="text" placeholder="SKU Bar-code " />
                            </Form.Group>
                        </div>
                    </div>

                    <div>
                        {selectedValue.yes === '1' ? <div className="row">
                            <div className="col-sm-6">
                                <Form.Group>
                                    <Form.Label>SKU MF (Qty per Kg)<sup>*</sup></Form.Label>
                                    <Form.Control type="text" placeholder="SKU MF " />
                                </Form.Group>
                            </div>

                            <div className="col-sm-6">
                                <Form.Group>
                                    <Form.Label>Price Per kg/lt (Auto generated)</Form.Label>
                                    <Form.Control type="text" placeholder="Price Per kg/lt " />
                                </Form.Group>
                            </div>
                        </div> : null}
                    </div><br></br>

                </Form><hr></hr>

                <div>
                    <div className="col-md-6 col-sm-6 animation-wrapper">
                        <Slide onEnter={onEnter}>
                            {children}
                        </Slide>
                    </div>

                    <div className="row">
                        <ul className="event-log">
                            {renderLogs()}
                        </ul>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <Button variant="contained" color="primary"
                            onClick={onEnter} >Add New SKU </Button>
                    </div>
                </div><hr></hr>

                <div className="row">
                    <div className="col-sm-6">
                        <Button variant="contained" color="secondary">
                            Back
                            </Button>
                    </div>
                    <div className="col-sm-6">
                        <Button className ={classes.submitbtn} variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProductSKUAddition;