import React, { Component } from 'react';
// import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
	root: {
		margin: 'auto',
		width: '50%'
	},
	paper: {
		width: 200,
		height: 230,
		overflow: 'scroll',
	}
});

class TransferList extends Component {
	state = {
		userSkills: []
	};

	addSkill = skill => {
		console.log(skill);
		this.setState({
			userSkills: [...this.state.userSkills, skill],
			unusedSkills: this.props.allSkills.filter(
				skill => !this.state.userSkills.includes(skill)
			)
		});
	};

	removeSkill = skillToRemove => {
		console.log(skillToRemove);
		this.setState({
			userSkills: this.state.userSkills.filter(
				skill => skill !== skillToRemove
			),
			unusedSkills: this.props.allSkills.filter(
				skill => !this.state.userSkills.includes(skill)
			)
		});
	};

	render() {
		const { classes } = this.props;
		const allSkillsHtml =
			this.props.allSkills &&
			this.props.allSkills
				.filter(skill => !this.state.userSkills.includes(skill))
				.map(skill => (
					<ListItem
						key={skill.id}
						role='listitem'
						button
						onClick={() => this.addSkill(skill)}>
						<ListItemText primary={skill.tag} />
					</ListItem>
				));
		const userSkills =
			this.state.userSkills &&
			this.state.userSkills.map(skill => (
				<ListItem
					key={skill.id}
					role='listitem'
					button
					onClick={() => this.removeSkill(skill)}>
					<ListItemText primary={skill.tag} />
				</ListItem>
			));

		return (
			<Grid
				container
				spacing={2}
				justify='space-evenly'

				className={classes.root}>
				<Grid item xs={5}>
					<Typography variant='subtitle2' align="center">
						Available Skills
					</Typography>
				</Grid>
				<Grid item xs={5}>
					<Typography variant='subtitle2' align="center">
						Selected Skills
					</Typography>
				</Grid>
				<Grid item xs={5}>
					<Paper className={classes.paper}>
						<List>{allSkillsHtml}</List>
					</Paper>
				</Grid>
				<Grid item xs={5}>
					<Paper className={classes.paper}>
						<List>{userSkills}</List>
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<Button onClick={this.saveSkills}>Save</Button>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(TransferList);
// function not(a, b) {
//     return a.filter(value => b.indexOf(value) === -1);
// }

// function intersection(a, b) {
//     return a.filter(value => b.indexOf(value) !== -1);
// }

// export default function TransferList() {
//     const classes = useStyles();
//     const [checked, setChecked] = React.useState([]);
//     const [left, setLeft] = React.useState([0, 1, 2, 3]);
//     const [right, setRight] = React.useState([4, 5, 6, 7]);

//     const leftChecked = intersection(checked, left);
//     const rightChecked = intersection(checked, right);

//     const handleToggle = value => () => {
//         const currentIndex = checked.indexOf(value);
//         const newChecked = [...checked];

//         if (currentIndex === -1) {
//             newChecked.push(value);
//         } else {
//             newChecked.splice(currentIndex, 1);
//         }
//         setChecked(newChecked);
//     };

//     const handleAllRight = () => {
//         setRight(right.concat(left));
//         setLeft([]);
//     };

//     const handleCheckedRight = () => {
//         setRight(right.concat(leftChecked));
//         setLeft(not(left, leftChecked));
//         setChecked(not(checked, leftChecked));
//     };

//     const handleCheckedLeft = () => {
//         setLeft(left.concat(rightChecked));
//         setRight(not(right, rightChecked));
//         setChecked(not(checked, rightChecked));
//     };

//     const handleAllLeft = () => {
//         setLeft(left.concat(right));
//         setRight([]);
//     };

//     const customList = items => (
//         <Paper className={classes.paper}>
//             <List dense component="div" role="list">
//                 {items.map(value => {
//                     const labelId = `transfer-list-item-${value}-label`;

//                     return (
//                         <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
//                             <ListItemIcon>
//                                 <Checkbox
//                                     checked={checked.indexOf(value) !== -1}
//                                     tabIndex={-1}
//                                     disableRipple
//                                     inputProps={{ 'aria-labelledby': labelId }}
//                                 />
//                             </ListItemIcon>
//                             <ListItemText id={labelId} primary={`List item ${value + 1}`} />
//                         </ListItem>
//                     );
//                 })}
//                 <ListItem />
//             </List>
//         </Paper>
//     );

//     return (
//         <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
//             <Grid item>{customList(left)}</Grid>
//             <Grid item>
//                 <Grid container direction="column" alignItems="center">
//                     <Button
//                         variant="outlined"
//                         size="small"
//                         className={classes.button}
//                         onClick={handleAllRight}
//                         disabled={left.length === 0}
//                         aria-label="move all right"
//                     >
//                         ≫
//           </Button>
//                     <Button
//                         variant="outlined"
//                         size="small"
//                         className={classes.button}
//                         onClick={handleCheckedRight}
//                         disabled={leftChecked.length === 0}
//                         aria-label="move selected right"
//                     >
//                         &gt;
//           </Button>
//                     <Button
//                         variant="outlined"
//                         size="small"
//                         className={classes.button}
//                         onClick={handleCheckedLeft}
//                         disabled={rightChecked.length === 0}
//                         aria-label="move selected left"
//                     >
//                         &lt;
//           </Button>
//                     <Button
//                         variant="outlined"
//                         size="small"
//                         className={classes.button}
//                         onClick={handleAllLeft}
//                         disabled={right.length === 0}
//                         aria-label="move all left"
//                     >
//                         ≪
//           </Button>
//                 </Grid>
//             </Grid>
//             <Grid item>{customList(right)}</Grid>
//         </Grid>
//     );
// }
// const mapStateToProps = state => ({
//     skills: state.allSkillsReducer,
// });

// this allows us to use <App /> in index.js
// export default connect(mapStateToProps)(TransferList);
