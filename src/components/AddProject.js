import React from "react";

// AddProject: A class component that renders a form for creating a new project.
class AddProject extends React.Component {
    // State to keep track of the project title, duration, and submission status
    state = { title: "", duration: "", isSubmitted: false };
    // Handler for form submission
    add = (e) => {
        e.preventDefault();
        // Checks if both title and duration fields are filled
        if (this.state.title === "" && this.state.duration === "") {
            alert("All field are mandatory");
            return;
        }
        this.props.addProjectHandler(this.state);
        this.setState({ isSubmitted: true });
        console.log(this.state)

    }
    // Render method to display the form
    render() {
        return (
            <div>
                <form className="ui form centered grid" onSubmit={this.add}>
                    <div className="ui form">
                        <input
                            type="text"
                            id="title"
                            placeholder='Project Title'
                            value={this.state.title}
                            onChange={(e) => this.setState({ title: e.target.value })}
                        // Updates the title state on input change
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            id="duration"
                            placeholder='Project Duration'
                            // Updates the duration state on input change
                            min="1" //  Ensures that duration is at least 1 month
                            value={this.state.duration}
                            onChange={(e) => this.setState({ duration: e.target.value })}
                        />
                    </div>
                    <button className='ui primary button' type="submit" disabled={this.state.isSubmitted}>Submit</button>
                </form>
            </div>
        )
    }
}

export default AddProject;