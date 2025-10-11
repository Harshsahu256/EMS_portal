import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Spinner, Form, Button } from 'react-bootstrap';
import { FaPoll } from 'react-icons/fa';
import { getAllPolls, voteOnPoll } from '../../../Services/authApi';

const PollSection = () => {
    const [poll, setPoll] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isVoting, setIsVoting] = useState(false);
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchPoll = async () => {
            try {
                const response = await getAllPolls();
                const firstActivePoll = response.data?.find(p => p.isActive);
                setPoll(firstActivePoll);
            } catch (err) {
                setError("Polls could not be loaded.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchPoll();
    }, []);

    const handleVote = async (optionIndex) => {
        if (isVoting) return;

        const userVote = poll.votes.find(v => v.user === currentUser?._id);
        if (userVote && userVote.optionIndex === optionIndex) {
            return;
        }

        setIsVoting(true);
        const originalPoll = JSON.parse(JSON.stringify(poll));

        const pollToUpdate = {
            ...originalPoll,
            options: originalPoll.options.map(o => ({ ...o })),
            votes: originalPoll.votes.map(v => ({ ...v }))
        };

        if (userVote) {
            const prevIndex = userVote.optionIndex;
            if (typeof prevIndex === "number" && pollToUpdate.options[prevIndex]) {
                pollToUpdate.options[prevIndex].votes -= 1;
            }
            pollToUpdate.options[optionIndex].votes += 1;

            const voteToUpdateInArray = pollToUpdate.votes.find(v => v.user === currentUser?._id);
            voteToUpdateInArray.optionIndex = optionIndex;
        } else {
            pollToUpdate.options[optionIndex].votes += 1;
            pollToUpdate.totalVotes += 1;
            pollToUpdate.votes.push({ user: currentUser?._id, optionIndex });
        }

        setPoll(pollToUpdate);

        try {
            const response = await voteOnPoll(poll._id, { optionIndex });
            const updatedPoll = response.data;
            const updatedUserVote = updatedPoll.votes.find(v => v.user === currentUser?._id);
            updatedPoll.hasVoted = !!updatedUserVote;
            setPoll(updatedPoll);
        } catch (err) {
            alert("There was a problem submitting your vote.");
            setPoll(originalPoll);
        } finally {
            setIsVoting(false);
        }
    };

    const handleViewVotes = () => {
        if (poll) navigate(`/poll-results/${poll._id}`);
    };

    if (isLoading) return <div className="d-flex justify-content-center my-4"><Spinner animation="border" variant="danger" /></div>;
    if (error || !poll) return <Card border="0" className="text-center p-4 my-4 shadow-sm"><Card.Text className="text-muted">{error || "No active poll available."}</Card.Text></Card>;

    const userVote = poll.votes.find(v => v.user === currentUser?._id);
    const userHasVoted = !!userVote;
    const votedOptionIndex = userHasVoted ? userVote.optionIndex : null;

    return (
        <Card border="0" className="my-4 px-2 shadow-sm">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold m-0">{poll.question}</h5>
                </div>
                <p className="text-muted small d-flex align-items-center gap-2 mb-3">
                    <FaPoll /> {userHasVoted ? "You can change your vote." : "Select an option to vote."}
                </p>

                <div className="mt-3">
                    {poll.options.map((option, index) => {
                        const percentage = poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0;
                        const isChecked = votedOptionIndex === index;

                        return (
                            <div
                                key={option._id || index}
                                className="mb-2 p-2 rounded"
                                onClick={() => handleVote(index)}
                                style={{
                                    cursor: isVoting ? "wait" : "pointer",
                                    border: isChecked ? "2px solid #007bff" : "1px solid #eee",
                                }}
                            >
                                <div className="d-flex justify-content-between align-items-center fw-medium">
                                    <span>
                                        {option.text}
                                        {isChecked && " (Your vote)"}
                                    </span>
                                    <span>{`${Math.round(percentage)}%`}</span>
                                </div>
                                <div className="mt-2" style={{ height: "8px", backgroundColor: "#e9edef", borderRadius: "4px", overflow: "hidden" }}>
                                    <div style={{ height: "100%", width: `${percentage}%`, backgroundColor: isChecked ? "#007bff" : "#00a884", borderRadius: "4px", transition: "width 0.5s ease-in-out" }}></div>
                                </div>
                            </div>
                        );
                    })}
                    <div className="text-center mt-3">
                        <Button variant="outline-primary" size="sm" onClick={handleViewVotes} disabled={isVoting}>
                            View Detailed Results
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default PollSection;