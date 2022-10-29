import numpy as np
import pandas as pd
from timeflux.core.node import Node
from timeflux.nodes.window import Slide
# import cvxEDA from cvxEDA.py


class MovingAverage(Slide):
    """Average the data on a rolling window
    Attributes:
        i (Port): Default input, expects DataFrame.
        o (Port): Default output, provides DataFrame and meta.

    Args:
        length (float): The length of the window, in seconds.
    """

    def __init__(self, length, step):

        super(self.__class__, self).__init__(length=length, step=step)
        self._columns = None

    def update(self):

        if not self.i.ready():
            return
        if self._columns is None:
            self._columns = self.i.data.columns

        # At this point, we are sure that we have some data to process
        super(self.__class__, self).update()

        # if the window output is ready, fit the scaler with its values
        if self.o.ready():
            time = self.i.data.index[-1]
            self.o.data = pd.DataFrame(
                np.mean(self.o.data.values, axis=0).reshape(1, -1),
                index=[time],
                columns=self._columns,
            )

# class TonicComponent(Slide):
#     """Average the data on a rolling window
#     Attributes:
#         i (Port): Default input, expects DataFrame.
#         o (Port): Default output, provides DataFrame and meta.
#
#     Args:
#         length (float): The length of the window, in seconds.
#     """
#
#     def __init__(self, length, step):
#
#         super(self.__class__, self).__init__(length=length, step=step)
#         self._columns = None
#
#     def update(self):
#
#         if not self.i.ready():
#             return
#         if self._columns is None:
#             self._columns = self.i.data.columns
#
#         # At this point, we are sure that we have some data to process
#         super(self.__class__, self).update()
#
#         if self.o.ready():
#             time = self.i.data.index[-1]
#             y = self.i.data.values
#             yn = (y - y.mean()) / y.std()
#             Fs = 10.
#             [r, p, t, l, d, e, obj] = cvxEDA.cvxEDA(yn, 1./Fs)
#             self.o.data = pd.DataFrame(
#                 np.mean(r, axis=0).reshape(1, -1),
#                 index=[time],
#                 columns=self._columns,
#             )
