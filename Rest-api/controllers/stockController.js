const { stockModel } = require('../models');


function getAllStocks(req, res, next) {
    stockModel.find()
        .populate('userId')
        .then(stocks => res.json(stocks))
        .catch(next);
}

function createStock(req, res, next) {
    const { stockName, stockTicker, sharePrice, stockDescription, stockLogoLink } = req.body;
    const { _id: userId } = req.user;

    // Input validation
    if (!stockName || !stockTicker || !sharePrice || !userId || !stockDescription || !stockLogoLink) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Create stock in the database
    stockModel.create({ stockName, stockTicker, sharePrice, stockDescription, stockLogoLink, userId })
        .then(stock => res.status(201).json(stock)) // Status 201 for created
        .catch(next); // Delegate error handling to middleware
}

function getStock(req, res, next) {
    const { stockId } = req.params;

    stockModel.findById(stockId)
        .populate('userId')
        .then(stock => res.json(stock))
        .catch(next);
}

// function editStock(req, res, next) {
//     const { stockId, stockName, stockTicker, sharePrice, stockDescription, stockLogoLink } = req.body; // Extract stock details from request body
//     const { _id: userId } = req.user;
//     console.log("USER IS"+req.user);
    


//     // Validate input fields
//     if (!stockId || !stockName || !stockTicker || !sharePrice || !stockDescription || !stockLogoLink) {
//         return res.status(400).json({ message: "All fields are required." });
//     }

//     // Ensure the stock belongs to the user
//     stockModel.findOneAndUpdate(
//         { _id: stockId, userId }, // Filter by stock ID and user ID
//         { stockName, stockTicker, sharePrice, stockDescription, stockLogoLink }, // Fields to update
//         { new: true } // Return the updated document
//     )
//     .then(updatedStock => {
//         if (updatedStock) {
//             res.status(200).json(updatedStock); // Return the updated stock
//         } else {
//             res.status(401).json({ message: "Not allowed!" }); // User not authorized
//         }
//     })
//     .catch((err) => {
//         console.error("Error updating stock:", err); // Log the error
//         next(err); // Pass error to middleware
//     });
// }




function watch(req, res, next) {
    const { stockId } = req.body;
    const { _id: userId } = req.user;

    console.log(stockId)

    stockModel.findByIdAndUpdate(
        stockId,
        { $addToSet: { watchers: userId } }, // Avoid duplicates
        { new: true } // Return the updated document
    )
    .then(updatedStock => {
        if (!updatedStock) {
            return res.status(404).json({ message: 'Stock not found' });
        }
        res.status(200).json(updatedStock);
    })
    .catch(next);
}



function unwatch(req, res, next) {
    const { stockId } = req.body;
    const { _id: userId } = req.user;

    console.log(stockId)

    stockModel.findByIdAndUpdate(
        stockId,
        { $pull: { watchers: userId } }, // Avoid duplicates
        { new: true } // Return the updated document
    )
    .then(updatedStock => {
        if (!updatedStock) {
            return res.status(404).json({ message: 'Stock not found' });
        }
        res.status(200).json(updatedStock);
    })
    .catch(next);
}


function deleteStock(req, res, next) {
    const { stockId } = req.params; // Extract stock ID from request parameters
    const { _id: userId } = req.user; // Get user ID from the authenticated user

    
    // Find the stock by ID and ensure it belongs to the user before deletion
    stockModel.findOneAndDelete({ _id: stockId, userId }) 
        .then(deletedStock => {
            if (deletedStock) {
                res.status(200).json({ message: "Stock successfully deleted", deletedStock }); 
            }
        })
        .catch(next); 
}

function editStock(req, res, next) {
    const { stockId } = req.params; // Extract stock ID from request params
    const { _id: userId } = req.user; // Extract user ID from req.user
    const payload = req.body; // Extract update data from request body

    stockModel.findOneAndUpdate({ _id: stockId, userId }, payload , { new: true })
        .then(updatedPost => {
            if (updatedPost) {
                res.status(200).json(updatedPost);
            }
            else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}




module.exports = {
    getAllStocks,
    createStock,
    getStock,
    editStock,
    deleteStock,
    watch,
    unwatch
}
