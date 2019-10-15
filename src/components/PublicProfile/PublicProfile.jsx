import React from 'react';
import { useSelector } from 'react-redux';

//COMPONENT IMPORTS
import SkillList from '../SkillList/SkillList';
//MATERIAL-UI IMPORTS
import { Grid, Typography, Link, Chip } from '@material-ui/core';
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
    },
    studentAccountBadge: {
        color: 'white',
        fontWeight: 'bold',
        background: '#3f51b5',
        padding: theme.spacing(0, 2)
    },
    mentorAccountBadge: {
        color: 'white',
        fontWeight: 'bold',
        background: '#43a047',
        padding: theme.spacing(0, 2)
    },
    clientAccountBadge: {
        color: 'white',
        fontWeight: 'bold',
        background: '#ef6c00',
        padding: theme.spacing(0, 2)
    }
}));

function PublicProfile(props) {
    const selectedUser = useSelector(state => state.selectedUserReducer);
    //sets selectedUser variable to redux state of selected user

    const displayedUser = props.user || selectedUser;
    //display the user passed as props if there is one, otherwise display selected user

    //determines account type
    let isStudent = () => {
        return displayedUser.user_type === 'Student';
    };
    let isMentor = () => {
        return displayedUser.user_type === 'Mentor';
    };
    let isClient = () => {
        return displayedUser.user_type === 'Client';
    };

    const classes = useStyles();

    return (
        <Grid className={classes.root} container spacing={4} justify="space-around">
            {/* USER DETAILS: NAME, FOCUS, LOCATION, TYPE */}
            <Grid item xs={12} align="center">
                <Typography color="primary" variant="h4" className={classes.username}>
                    {displayedUser.username}
                </Typography>
                <Typography variant="h6">{displayedUser.focus_skill}</Typography>
                <Typography variant="body1">{displayedUser.location}</Typography>
            </Grid>

            {/* USER ACCOUNT TYPE BADGE */}
            <Grid item xs={12} align="center">
                <Typography variant="button">
                    {isStudent() && (
                        <Chip
                            label={displayedUser.user_type}
                            className={classes.studentAccountBadge}
                        />
                    )}
                    {isMentor() && (
                        <Chip
                            label={displayedUser.user_type}
                            className={classes.mentorAccountBadge}
                        />
                    )}
                    {isClient() && (
                        <Chip
                            label={displayedUser.user_type}
                            className={classes.clientAccountBadge}
                        />
                    )}
                </Typography>
            </Grid>

            {/* USER BIO */}
            <Grid item xs={12} align="center">
                <Typography variant="body2">{displayedUser.bio}</Typography>
            </Grid>

            {/* NETWORKING LINKS */}
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

            {/* SKILL LIST */}
            <Grid item xs={12} align="center">
                <SkillList skillList={displayedUser.skills} />
            </Grid>
        </Grid>
    );
}
export default PublicProfile;
