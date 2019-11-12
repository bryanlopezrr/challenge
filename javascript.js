const RandomInt = (max, min) =>  Math.floor(Math.random()*((max-min)+1)) + min;

// SMALLEST NUMBER IN MATRIX
const smallest  = 1;
const largest   = 10;

// MATRIX DEFINITION
const Rows      = 9;
const Columns   = 3;

let CurrentColumnIndex = 0;
let CurrentRowIndex = 0;



// Responsible for Creating the Matrix
class MatrixManager
{
    constructor(RowCount, CoumnCount, smallesMatrixElement, largestMatrixElement)
    {
        // active indeces
        this.activeIndeces = {
            row: 0,
            col: 0
        }

        this.MatrixDimensions = {
            Rows: RowCount,
            Columns: CoumnCount
        }

        this.ElementBoundaries = {
            small: smallesMatrixElement,
            large: largestMatrixElement
        }

        // This is where we are going to draw our Matrix
        this.DomLocation = document.getElementById("matrix");

        // MAKES THE MATRIX
        // Array of Arrays which will hold the Matrix
        this.Matrix = this.MakeMatrix(this.MatrixDimensions.Rows, this.MatrixDimensions.Columns, this.ElementBoundaries.small, this.ElementBoundaries.large);

        // RENDERS MATRIX TO THE DOM
        this.HTMLMatrix = this.MatrixDom(this.Matrix, this.activeIndeces.col, this.activeIndeces.row);

    }

    // Generates a new Matrix for us
    MakeMatrix(RowCount, ColCount, min, max)
    {
        var RowCollection = [];
        var ColumnCollection = []
        for(var i = 0; i < RowCount; i++)
        {
            for(var j = 0; j < ColCount; j++)
            {
                ColumnCollection.push(RandomInt(max, min));
            }
            RowCollection.push(ColumnCollection);
            ColumnCollection = [];
        }
        return RowCollection;
    }


    // Using a Defined Matrix, we render the DOM with it...
    MatrixDom(Matrix, ActiveColumn, ActiveRow) 
    {
        const ConditionalClass = (index, targetIndex, ClassName) => index === targetIndex ? " "+ClassName : "";

        this.DomLocation.innerHTML = Matrix.map((RowData, RowIndex) => {
            return `<div class='matrixRow'>` + RowData.map((MatrixValue, ColumnIndex) => {
                return `<span class="matrixBox${ConditionalClass(ColumnIndex, ActiveColumn, "ActiveColumn")}${ConditionalClass(RowIndex, ActiveRow, "ActiveRow")}">
                    ${MatrixValue}
                </span>`
            }).join("") + "</div>"
        }).join("");
    }


    // rerenderMatrix with new ActiveIndeces...
    MatrixReRender(newRow, newCol)
    {
        // updates this field for tracking purposes...
        this.activeIndeces = {
            row: newRow,
            col: newCol
        }
        this.HTMLMatrix = this.MatrixDom(this.Matrix, this.activeIndeces.col, this.activeIndeces.row);
    }

}



new MatrixManager(Rows, Columns, smallest, largest);