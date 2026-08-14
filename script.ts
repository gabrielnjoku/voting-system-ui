
//Describe the basic JavaScript types that can be used in this script
type PTypes = string | number | number[] | boolean

//Describe what a candidate variable should be made of
type TCandidate = 'Augustine' | 'Kosisochukwu';

//Declare the candidates array and initialize it with the contesting candidates
const candidates: TCandidate[] = ['Augustine', 'Kosisochukwu'];

//Declare the voter list as const so it can also be used to describe what a voter variable should be made of
const voters = [
  'Stephanie',
  'Rita',
  'James',
  'Peter',
  'Victor',
  'Anthony',
  'Charles',
  'Augustine',
  'Lillian',
  'Gabriel',
  'Christopher',
  'Kosisochukwu',
  'Bonaventure',
  'Abigail',
  'David',
  'Amarachi',
  'Loveth',
  'Chidimma',
  'Ifeanyi',
  'Majesty',
] as const;

//Describe what a voter variable should be made of
type TVoters = typeof voters[number];

//Describe what the poll object should be made of
type TPoll = Record<TCandidate, number>

//Declare the poll object and initialize it with the candidates having zero votes to start with. The poll object is used inside the result object
const poll: TPoll = {
  'Augustine': 0,
  'Kosisochukwu': 0
};

//Describe how the result object should look (properties it must have to be a valid "result" object)
interface Result {
  total: number;
  winner: TCandidate;
  poll: TPoll;
}

//Declare and initialize the result object first as an empty object (to be populated later)
const result: Partial<Result> = {};

//Function to be called whenever we want to fetch the entire result object
const getResult = (): Partial<Result> => {
  return result
};

//Function to be called whenever we want to check result for a particular candidate
const checkResult = (candidate: TCandidate): number | undefined => {
  return result.poll?.[candidate]
}

//Function to be called whenever we want to check the election winner
const getWinner = (): TCandidate | undefined => {
  return result.winner
};

//Variable holding every voter's choice as selected
const votingRecord: Record<TVoters, TCandidate> = {
  'Stephanie': "Augustine",
  'Rita': "Kosisochukwu",
  'James': "Augustine",
  'Peter': "Kosisochukwu",
  'Victor': "Augustine",
  'Anthony': "Kosisochukwu",
  'Charles': "Augustine",
  'Augustine': "Kosisochukwu",
  'Lillian': "Augustine",
  'Gabriel': "Kosisochukwu",
  'Christopher': "Augustine",
  'Kosisochukwu': "Augustine",
  'Bonaventure': "Augustine",
  'Abigail': "Augustine",
  'David': "Augustine",
  'Amarachi': "Augustine",
  'Loveth': "Kosisochukwu",
  'Chidimma': "Augustine",
  'Ifeanyi': "Kosisochukwu",
  'Majesty': "Augustine",
}

//Function to process a single voter's choice (in votingRecord)
const vote = (voter: TVoters) => {
  const whoisVoting = voter;
  const whichCandidate = votingRecord[whoisVoting];
  if (result.poll) {
    result.poll[whichCandidate] = (result.poll[whichCandidate] ?? 0) + 1;
  } else {
    result.poll = poll;
    result.poll[whichCandidate] = (result.poll[whichCandidate] ?? 0) + 1;
  }
  result.total = (result.total ?? 0) + 1;

  //  console.log({ result })
}

//Function to iteratively use the vote() funtion above to process all voters' choices (in votingRecord)
const election = (voters: readonly TVoters[]) => {
  voters.forEach((voter) => {
    vote(voter)
  })

  const pollEntries = Object.entries(result.poll ?? {});
  const pollEntriesSorted = pollEntries.sort((a, b) => b[1] - a[1]);
  const pollWinner: TCandidate = pollEntriesSorted[0][0] as TCandidate;
  result.winner = pollWinner;

  // if ((result.poll?.Augustine ?? 0) > (result.poll?.Kosisochukwu ?? 0)) {
  //   result.winner = "Augustine";
  // } else {
  //   result.winner = "Kosisochukwu";
  // }
}

//Actual processing of voters choices (in VotingRecords)
//election(voters);

//After choices are processed, fetch the current result
const electionResult = getResult();

//Print the fetched result to console
//console.log(electionResult);




//Populate the "Preferred Candidate" <select> element using the `candidates` array,
const populateCandidateSelect = (candidateList: TCandidate[]) => {
  const candidateSelect = document.getElementById("candidate") as HTMLSelectElement;
  if (!candidateSelect) return;

  candidateList.forEach((candidate) => {
    const option = document.createElement("option");
    option.value = candidate;
    option.innerText = candidate;
    candidateSelect.appendChild(option);
  });
};

populateCandidateSelect(candidates);

//Handle the "Cast Vote" button click
const castVoteButton = document.getElementById("castVote") as HTMLButtonElement;
castVoteButton?.addEventListener("click", (event: MouseEvent) => {
  event.preventDefault();

  //Grab user inputted voter name and convert to lowercase for comparison with voter list
  const voterInput = document.getElementById("voter") as HTMLInputElement;
  let voterNameString = voterInput?.value;

  const voterName: TVoters = voters.find(
    (voter) => voter.toLowerCase() === voterNameString.toLowerCase()
  ) ?? ""  as TVoters;

  if (voters.includes(voterName)) {

    //Grab user inputted candidate choice
    const candidateInput = document.getElementById("candidate") as HTMLSelectElement;
    const choiceCandidate: TCandidate = candidateInput?.value as TCandidate;

    // Set voters choice in votingRecord object
    votingRecord[voterName] = choiceCandidate;

    //Process the election to reflect the last vote
    election(voters);

    //Fetch the current result
    const electionResult = getResult();
    const pollEntries = Object.entries(electionResult.poll ?? {});

    const [candidateOneName, candidateOneVotes] = pollEntries[0];
    const [candidateTwoName, candidateTwoVotes] = pollEntries[1];

    //Update the Election Scoreboard to reflect the latest vote
    const candidateOneNameHolder = document.getElementById("candidateOneName") as HTMLSpanElement;
    const candidateOneVotesHolder = document.getElementById("candidateOneVotes") as HTMLSpanElement;
    candidateOneNameHolder.innerText = candidateOneName;
    candidateOneVotesHolder.innerText = String(candidateOneVotes);

    const candidateTwoNameHolder = document.getElementById("candidateTwoName") as HTMLSpanElement;
    const candidateTwoVotesHolder = document.getElementById("candidateTwoVotes") as HTMLSpanElement;
    candidateTwoNameHolder.innerText = candidateTwoName;
    candidateTwoVotesHolder.innerText = String(candidateTwoVotes);

    const votingForm = document.getElementById("votingForm") as HTMLFormElement || null;
    votingForm.reset();

  } else {
    window.alert("Sorry, you are not eligible to vote!");
    //const votingForm = document.getElementById("votingForm") as HTMLFormElement || null;
    //votingForm.reset();
  }

})


//Handle the "Check Result" button click
const checkResultButton = document.getElementById("checkResult") as HTMLButtonElement;
castVoteButton?.addEventListener("click", (event: MouseEvent) => {

  //Fetch the current result
  const electionResult = getResult();
  const pollEntries = Object.entries(electionResult.poll ?? {});

  const [candidateOneName, candidateOneVotes] = pollEntries[0];
  const [candidateTwoName, candidateTwoVotes] = pollEntries[1];

  //Update the Election result modal to reflect the latest result
  const candidateOneResultHolder = document.getElementById("candidateOneResults") as HTMLParagraphElement;
  candidateOneResultHolder.innerText = `${candidateOneName}: ${candidateOneVotes} Votes`;

  const candidateTwoResultHolder = document.getElementById("candidateTwoResults") as HTMLParagraphElement;
  candidateTwoResultHolder.innerText = `${candidateTwoName}: ${candidateTwoVotes} Votes`;

  //Set the election winner
  const electionWinner = electionResult.winner;
  const electionWinnerHolder = document.getElementById("electionWinner") as HTMLParagraphElement;
  electionWinnerHolder.innerText = `Election Winner: ${electionWinner}`;

})