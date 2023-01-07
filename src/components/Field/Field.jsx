import React from "react"

import s from "./Field.module.scss"

const Field = (
    {n,
    m,
    k,
    lose, 
    setLose,
    win,
    setWin,
    field,
    fieldAns}) => {

    let a=React.useRef();

    React.useEffect(() => {
        a.current.children[0].style.display='none'
        a.current.children[n+1].style.display='none'
    
        for (let row=0; row<n+2; row++){
            a.current.children[row].children[0].style.display='none'
            a.current.children[row].children[m+1].style.display='none'
        }
      });

    
    const checkWin = () => {
        let checked=document.querySelectorAll(`.${s.cell}`) 
        let bombCount=0;
        let checkCount=0;

        for (let i = 0; i < checked.length; i++) {
            let row =Math.floor(checked[i].id/(m+2))
            let col = checked[i].id%(m+2)-1
            if (row>0 && row<n+1 && col>0 && col<m+1) {
                if (a.current.children[row].children[col].hasAttribute("bombed")) {
                    bombCount++
                }
                if (a.current.children[row].children[col].hasAttribute("checked")) {
                    checkCount++
                }
            }
        }
        if(bombCount + checkCount === n*m && bombCount===k) {
            setWin(true)
            console.log("you win")
            a.current.classList.add(s.win)
            let checked=document.querySelectorAll(`.${s.cell}`)
            for (let i = 0; i < checked.length; i++) {
                if( checked[i].hasAttribute("checked")) {
                    checked[i].removeAttribute("checked"); 
                }
            }

        }

    }
    
    const checkCell = (row,col) => {

        if(fieldAns[row][col]!==0) {
            a.current.children[row].children[col].textContent=fieldAns[row][col];
            } else {
                a.current.children[row].children[col].textContent = " "
            }

        a.current.children[row].children[col].setAttribute("checked", "yes");

        if(fieldAns[row][col]===0) {
            const zeroes=new Set([Number(a.current.children[row].children[col].getAttribute('id'))]);
            
            
            const zeroesCollect = (a, fieldAns, row,col) => {
                let dx = [-1,-1,-1,0,0,1,1,1];
                let dy = [-1,0,1,-1,1,-1,0,1];
                for (let k=0; k<dx.length; k++) {
                    if(a.current.children[row+dx[k]].children[col+dy[k]].getAttribute('checked')==null &&
                       fieldAns[row+dx[k]][col+dy[k]]===0 && row+dx[k]>0 && row+dx[k]<n+1 && col+dy[k]>0 && col+dy[k]<m+1) { 
                       zeroes.add(Number(a.current.children[row+dx[k]].children[col+dy[k]].getAttribute('id')))
                       
                    }
                    if (a.current.children[row+dx[k]].children[col+dy[k]].hasAttribute("bombed") ) {
                        a.current.children[row+dx[k]].children[col+dy[k]].removeAttribute("bombed"); 
                        a.current.children[row+dx[k]].children[col+dy[k]].classList.toggle("bomb")
                    }
                    if(fieldAns[row+dx[k]][col+dy[k]]!==0) {
                    a.current.children[row+dx[k]].children[col+dy[k]].textContent=fieldAns[row+dx[k]][col+dy[k]];
                    } else {
                        a.current.children[row+dx[k]].children[col+dy[k]].textContent = " "
                    }

                    a.current.children[row+dx[k]].children[col+dy[k]].setAttribute("checked", "yes"); 

                }
                zeroes.delete(Number(a.current.children[row].children[col].getAttribute('id')))
                
            }

            while(zeroes.size) {
                zeroes.forEach((id) => {
                    let row = Math.floor(id/(m+2));
                    let col = id%(m+2)-1;
                    zeroesCollect(a, fieldAns, row,col)
                  });
            }
        }

        if(fieldAns[row][col]!=="*") {
            if (a.current.children[row].children[col].hasAttribute("bombed") ) {
                a.current.children[row].children[col].removeAttribute("bombed"); 
                a.current.children[row].children[col].classList.toggle("bomb")
            }
        }

        if(fieldAns[row][col]==="*") {
            setLose(true);
            console.log("you lose")
            a.current.classList.add(s.end)

            let checked=document.querySelectorAll(`.${s.cell}`)
            
                for (let i = 0; i < checked.length; i++) {
                    if( checked[i].hasAttribute("checked")) {
                        checked[i].removeAttribute("checked"); 
                    }
                    if(fieldAns[ Math.floor(checked[i].id/(m+2))][checked[i].id%(m+2)-1]===0) {
                        checked[i].textContent=" ";
                        checked[i].classList.remove("bomb");

                    } else if(fieldAns[ Math.floor(checked[i].id/(m+2))][checked[i].id%(m+2)-1]==="*") {
                        checked[i].classList.add("bomb")
                        
                    } else {
                     checked[i].textContent=fieldAns[ Math.floor(checked[i].id/(m+2))][checked[i].id%(m+2)-1]
                     checked[i].classList.remove("bomb")
                    }
                }
        }
        checkWin()
    }
    
    const onHandleRightClick = ( row, col) => (event) => {
        event.preventDefault();
        console.log(a.current.children[row].children[col].getAttribute('bombed')==null && !a.current.children[row].children[col].textContent)
        if(a.current.children[row].children[col].getAttribute('bombed')==null && !a.current.children[row].children[col].textContent) {
            a.current.children[row].children[col].setAttribute("bombed", "yes");
            event.target.classList.add("bomb") 
        } else {
            a.current.children[row].children[col].removeAttribute("bombed"); 
            event.target.classList.remove("bomb")
        }
        checkWin()
                
        }

        
    
    
    return(
        <div className={s.field} ref={a}> 
            {
           field.map((rows, row) => {
                return (
                    <div className={s.row} >
                        {rows.map((item, col) => {
                        return <div className={s.cell} id={(row)*(m+2)+col+1}  onClick={()=>checkCell(row,col)} onContextMenu={onHandleRightClick( row, col)}></div>;
                        })}
                    </div>
                );
             })}
        </div>
    );
}

export default Field