import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography, Link, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SkillList from '../SkillList/SkillList';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    link: {
        fontWeight: 'bold',
        padding: theme.spacing(1)
    }
}));

function PublicProfile(props) {
    const selectedUser = useSelector(state => state.selectedUserReducer);
    //sets selectedUser variable to redux state of selected user

    const displayedUser = props.user || selectedUser;
    //display the user passed as props if there is one, otherwise display selected user

    const classes = useStyles();

    return (
        <Grid className={classes.root} container spacing={4} justify="space-around">
            <Grid item xs={12}>
                <Typography color="primary" variant="h5" align="center">
                    {displayedUser.username}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" align="left">
                    {displayedUser.focus_skill}
                </Typography>
                <Typography variant="body1" align="left">
                    {displayedUser.location}
                </Typography>
                <Chip color="primary" label={displayedUser.user_type} />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body2">{displayedUser.bio}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography align="left">
                    <Link className={classes.link} href={displayedUser.linkedin_url}>
                        LinkedIn
                    </Link>
                </Typography>
                <Typography align="left">
                    <Link className={classes.link} href={displayedUser.github_url}>
                        Github
                    </Link>
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography align="right">
                    <Link className={classes.link} href={displayedUser.website_url}>
                        Website
                    </Link>
                </Typography>
                <Typography align="right">
                    <Link
                        target="_blank"
                        className={classes.link}
                        href={`mailto:${displayedUser.email}`}>
                        E-Mail
                    </Link>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <SkillList skillList={displayedUser.skills} />
            </Grid>
        </Grid>
    );
}
export default PublicProfile;
