'use client';

import CountUp from 'react-countup';

const AnimatedCounter = ({ amount }: { amount: number }) => {
    return (
        <div className="w-full">
            <CountUp
                decimals={2}
                decimal=","
                prefix="¥"
                duration={3}
                end={amount}
            />
        </div>
    )
}

export default AnimatedCounter