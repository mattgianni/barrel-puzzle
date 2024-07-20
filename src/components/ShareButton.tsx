import React from "react";

const ShareButton: React.FC<{ score: number; active: boolean }> = ({
    score,
    active,
}) => {
    const scoreComment = (score: number): string => {
        if (score === 1) {
            return "godly";
        } else if (score === 2) {
            return "absolutely epic";
        } else if (score === 3) {
            return "pretty decent";
        } else if (score === 4) {
            return " truly pathetic";
        } else {
            return "transendental";
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: "Cracker Barrel Puzzle Score",
                    text: `I just acheived the ${scoreComment(
                        score
                    )} score of ${score} points in the Cracker Barrel Puzzle! Can you beat it?\n\nhttps://gianni.org/cracker/index.html`,
                })
                .then(() => {
                    console.log("Thanks for sharing!");
                })
                .catch(console.error);
        } else {
            alert("Sharing is not supported in this browser.");
        }
    };

    return active ? (
        <button
            className="bg-green-500 rounded-full text-white text-[3vw] lg:text-[41px] px-[2vw]"
            onClick={handleShare}
        >
            Share
        </button>
    ) : (
        <button className="bg-gray-300 rounded-full text-white text-[3vw] lg:text-[41px] px-[2vw] select-none cursor-default">
            Share
        </button>
    );
};

export default ShareButton;
