import React, { Fragment, memo } from 'react'
import { Modal } from 'antd';


export default memo(
    function Dialog({ children, open, setOpen, className, ...rest }) {
        return (
            <Fragment>
                <Modal
                    title={"Add User"}
                    centered
                    open={open}
                    onCancel={() => setOpen(false)}
                    {...rest}
                >
                    <div className={className}>
                        {children}
                    </div>
                </Modal>
            </Fragment>
        )
    }

)