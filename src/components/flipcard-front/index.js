import React from 'react'

const FlipcardFront = ({index}) => {
    return (
        <div>
            <div className="flex flip-card-front font-bold text-xl mb-2">
                  <p className="m-auto text-gray-100 justify-center">
                    #{index + 1}
                  </p>
                </div>
        </div>
    )
}

export default FlipcardFront