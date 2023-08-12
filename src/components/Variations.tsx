import { PV, Variation } from "../lib/Engine"

interface Props {
    pv: Variation[]
}

const Variations = (props: Props) => {
    const pv = props.pv
    if (pv.length === 0) {
        return (
            <>
                <div><b>No Hints</b></div>
            </>
        )
    } else
        return (
            <>
                <div><b>Top {pv.length} Hints</b></div>
                <ol>
                    {pv.map((variation, index) => {
                        return <li key={index}>{variation.score}: {PV.varString(variation.movelist)}</li>
                    })}
                </ol>
            </>
        )
}

export default Variations