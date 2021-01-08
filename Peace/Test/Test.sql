CREATE TABLE ACCSBJT (
    ID      INTEGER         NOT NULL,
    NAME    TEXT(101)       NOT NULL,
    COL1    INTEGER         DEFAULT 0,
    COL2    REAL            ,
    COL3    TEXT(101)       ,
    CONSTRAINT ACCSBJT_PK PRIMARY KEY(ID)  
);