import React from 'react';
import { useSelector } from 'react-redux';
//COMPONENT IMPORTS
import SkillList from '../SkillList/SkillList';
//MATERIAL-UI IMPORTS
import { Grid, Typography, Link } from '@material-ui/core';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import LanguageIcon from '@material-ui/icons/Language';
import EmailIcon from '@material-ui/icons/Email';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    username: {
        fontWeight: 'bold'
    },
    link: {
        display: 'inline-block',
        fontWeight: 'bold',
        fontSize: 'large',
        padding: theme.spacing(1),
        verticalAlign: 'middle'
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
                <Typography
                    color="primary"
                    variant="h4"
                    align="center"
                    className={classes.username}>
                    {displayedUser.username}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" align="center">
                    {displayedUser.focus_skill}
                </Typography>
                <Typography variant="body1" align="center">
                    {displayedUser.location}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="body2">{displayedUser.bio}</Typography>
            </Grid>
            <Grid container align="center">
                <Grid item xs={6}>
                    <Grid item xs={12}>
                        <Link href={displayedUser.linkedin_url}>
                            <Typography className={classes.link}>
                                <LinkedInIcon fontSize="large" />
                            </Typography>
                            <Typography className={classes.link}>LinkedIn</Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={12}>
                        <Link href={displayedUser.website_url}>
                            <Typography className={classes.link}>
                                <LanguageIcon fontSize="large" />
                            </Typography>
                            <Typography className={classes.link}>Website</Typography>
                        </Link>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid item xs={12}>
                        <Link href={displayedUser.github_url}>
                            <Typography className={classes.link}>
                                <GitHubIcon fontSize="large" />
                            </Typography>
                            <Typography className={classes.link}>GitHub</Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={12}>
                        <Link target="_blank" href={`mailto:${displayedUser.email}`}>
                            <Typography className={classes.link}>
                                <EmailIcon fontSize="large" />
                            </Typography>
                            <Typography className={classes.link}>E-Mail</Typography>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <SkillList skillList={displayedUser.skills} />
            </Grid>
        </Grid>
    );
}
export default PublicProfile;
