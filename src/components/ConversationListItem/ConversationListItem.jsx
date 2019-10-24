import React from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1, 5)
    }
}));

function ConversationListItem(props) {
    const classes = useStyles();
    const messageDate = new Date(props.message.date_time);

    return (
        <Grid item container spacing={3} xs={12} className={classes.root}>
            <Grid item container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="h5" color="primary" align="left">
                        To: {props.message.rname}
                    </Typography>
                    <Typography variant="subtitle1" color="secondary" align="left">
                        From: {props.message.sname}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle2" color="secondary" align="right">
                        <b>{messageDate.toDateString()}</b> {/* Date stamp in bold */}
                    </Typography>
                    <Typography variant="subtitle2" color="secondary" align="right">
                        <i>
                            {messageDate.toLocaleTimeString('en-US', {
                                hour12: true,
                                timeStyle: 'short'
                            })}
                        </i> {/* Time stamp in italics */}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">{props.message.message}</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
        </Grid>
    );
}

export default ConversationListItem;
